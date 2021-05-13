import * as CONST from "./constants.json";
import GAS_MARKER from '../assets/icn-gas-station.png';
import HOTEL_MARKER from '../assets/icn-hotel.png';
import RESTAURANT_MARKER from '../assets/icn-restaurant.png';
import TRUCKINT_MARKER from '../assets/icn-first-location.png';
import TRUCKLAST_MARKER from '../assets/icn-current-location.png';
import TRUCKFIRST_MARKER from '../assets/icn-path.png';

type GooglePlacesResult = google.maps.places.PlaceResult;
type GoogleGeometry = google.maps.places.PlaceGeometry;
type GoogleMarker = google.maps.Marker;
type GoogleMap = google.maps.Map;

let googleMarkers: { [key: string]: GoogleMarker[] } = {};

export const loadMapApi = (): HTMLScriptElement => {
    const mapURL = `https://maps.googleapis.com/maps/api/js?key=${CONST.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
    const scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapURL) === 0) {
            return scripts[i]
        }
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
}

export const dropMarker = (mapGoogle: GoogleMap, marker: { [x: string]: google.maps.Marker[] }, key: string, i: number): () => void => {
    return () => {
        if (marker[key].length === 0) return;
        marker[key][i].setMap(mapGoogle);
    };
}

export const clearMarkers = (marker: { [x: string]: google.maps.Marker[] }): void => {
    for (const key in marker) {
        for (let i = 0; i < marker[key].length; i++) {
            if (marker[key][i]) {
                marker[key][i].setMap(null);
            }
        }
        marker[key] = [];
    }
    marker = {};
}

const getMarkerIcon = (type: string | string[]): string => {
    if (type.includes("gas_station")) {
        return GAS_MARKER;
    } else if (type.includes("restaurant")) {
        return RESTAURANT_MARKER;
    } else if (type.includes("lodging")) {
        return HOTEL_MARKER;
    } else if (type.includes("truckIntLoc")) {
        return TRUCKINT_MARKER;
    } else if (type.includes("truckLastLoc")) {
        return TRUCKLAST_MARKER;
    } else if (type.includes("truckFirstLoc")) {
        return TRUCKFIRST_MARKER;
    } else {
        return ""
    }
}

export const createMarker = (result: GooglePlacesResult | any, truckType: string | string[]): GoogleMarker => {
    let position, type;
    if (truckType === "truckIntLoc" || truckType === "truckLastLoc" || truckType === "truckFirstLoc") {
        position = new google.maps.LatLng(parseFloat(result.lat), parseFloat(result.lng))
        type = truckType;
    } else {
        position = (result.geometry as GoogleGeometry).location;
        type = result.types
    }
    return new google.maps.Marker({
        position: position,
        icon: {
            url: getMarkerIcon(type),
            scaledSize: truckType === "truckIntLoc" || truckType === "truckFirstLoc" ? new google.maps.Size(20, 20) : new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
        },
        clickable: true
    });
}

export const searchPOI = (poiTypesList: any[], radius: any, firstExecution: boolean,
    truckLastLocation: { truckLastLat: number; truckLastLng: number; },
    places: google.maps.places.PlacesService, mapGoogle: GoogleMap) => {
    
    poiTypesList.forEach(poiType => {
        const search = {
            location: new google.maps.LatLng(truckLastLocation.truckLastLat, truckLastLocation.truckLastLng),
            type: poiType,
            radius: radius
        };

        places.nearbySearch(
            search,
            (
                results: GooglePlacesResult[] | null,
                status: google.maps.places.PlacesServiceStatus
            ) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    if (firstExecution) {
                        clearMarkers(googleMarkers);
                        firstExecution = false;
                    }
                    for (let i = 0; i < results.length; i++) {
                        if (!googleMarkers[poiType])
                            googleMarkers[poiType] = [];
                        googleMarkers[poiType][i] = createMarker(results[i], results[i].types as string[]);
                        setTimeout(dropMarker(mapGoogle, googleMarkers, poiType, i), i * 100);
                    }
                } else if (results?.length === 0 && Object.keys(googleMarkers).length > 0 && poiTypesList.length === 1) {
                    clearMarkers(googleMarkers);
                }
            }
        );
    });
}