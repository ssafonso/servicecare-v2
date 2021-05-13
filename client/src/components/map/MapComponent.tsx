import React, { useEffect, useRef, useState } from 'react';
import './MapComponent.scss';
import { clearMarkers, createMarker, dropMarker, searchPOI } from '../../utils/GoogleMapsUtils';
import { getTruckByLicense } from '../../services/TruckServer';

interface Map {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

let truckMarkers: { [key: string]: GoogleMarker[] } = {};
let truckLastLocation = {
    truckLastLat: 0,
    truckLastLng: 0
}
let mapGoogle: GoogleMap;
let places: google.maps.places.PlacesService;
let cacheChoices = {
    license: "",
    poiType: "",
    radius: null,
    truckLat: 0,
    truckLng: 0
}


const MapComponent: React.FC<Map> = ({ mapType, mapTypeControl = false }) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const formObject = document.getElementById("pac-control") as HTMLInputElement;

    const startMap = (): void => {
        if (!map)
            defaultMap();
    };
    // eslint-disable-next-line
    useEffect(startMap, [map]);

    const defaultMap = (): void => {
        initMap(13, new google.maps.LatLng(38.66789545548424, -8.66625516347592))
    };


    const mapControls = (): void => {
        if (map)
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(formObject)
    };
    // eslint-disable-next-line
    useEffect(mapControls, [map]);


    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            mapGoogle = new google.maps.Map(ref.current, {
                zoom: zoomLevel,
                center: address,
                mapTypeControl: false,
                streetViewControl: false,
                rotateControl: false,
                scaleControl: true,
                fullscreenControl: false,
                panControl: false,
                zoomControl: false,
                gestureHandling: 'cooperative',
                mapTypeId: mapType,
                draggableCursor: 'pointer',
            })
            places = new google.maps.places.PlacesService(mapGoogle);
            setMap(mapGoogle);
        }
    };

    return (
        <div className="map-container">
            <form id="pac-control" onSubmit={submitForm}>
                <input id="license-input" placeholder="Search by license plate" type="text" name="license" />
                <select id="poi-select" placeholder="Search POI type" name="poi">
                    <option value="">View all</option>
                    <option value="gas_station">Gas Stations</option>
                    <option value="restaurant">Restaurants</option>
                    <option value="lodging">Hotels</option>
                </select>
                <select id="radius-select" placeholder="Select radius" name="radius">
                    <option value="500">500m</option>
                    <option value="1000">1km</option>
                    <option value="5000">5km</option>
                </select>
                <button id="apply-btn">Apply</button>
            </form>
            <div ref={ref} className="map-container__map" id="map"></div>
        </div>
    );
}

export default MapComponent;

function submitForm(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    handleSearch(data);
}

function handleSearch(data: FormData) {
    const poi = data.get("poi") as string;
    const radius = parseInt(data.get("radius") as string);
    const license = data.get("license") as string;

    const poiTypesList = !poi ? ['gas_station', 'restaurant', 'lodging'] : [poi];

    fetchTrucks(license).then(() => {
        if (cacheChoices.poiType !== poi || cacheChoices.radius !== radius
            || cacheChoices.truckLat !== truckLastLocation.truckLastLat
            || cacheChoices.truckLng !== truckLastLocation.truckLastLng)
            searchPOI(poiTypesList, radius, true, truckLastLocation, places, mapGoogle);
    });
}

async function fetchTrucks(license: string): Promise<void> {
    const results: any = await getTruckByLicense(license);
    if (results.length !== 0) {
        clearMarkers(truckMarkers);

        truckLastLocation.truckLastLat = parseFloat(results[0].lat);
        truckLastLocation.truckLastLng = parseFloat(results[0].lng);
        mapGoogle.setCenter(new google.maps.LatLng(truckLastLocation.truckLastLat, truckLastLocation.truckLastLng));

        if (!truckMarkers[license])
            truckMarkers[license] = [];

        truckMarkers[license][0] = createMarker(results[0], "truckLastLoc");

        for (let index = 1; index < results.length - 1; index++) {
            truckMarkers[license][index] = createMarker(results[index], "truckIntLoc");
        }

        truckMarkers[license][results.length - 1] = createMarker(results[results.length - 1], "truckFirstLoc");

        for (let index = 0; index < truckMarkers[license].length; index++) {
            setTimeout(dropMarker(mapGoogle, truckMarkers, license, index), index * 100);
        }
    }
}