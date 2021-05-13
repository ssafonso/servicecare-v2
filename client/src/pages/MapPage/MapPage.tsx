import { useEffect, useState } from 'react';
import Map from '../../components/map/';
import './MapPage.css'
import { loadMapApi } from '../../utils/GoogleMapsUtils';

function MapPage() {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(()=> {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', function() {setScriptLoaded(true)})
    }, []);
    
    return (<div className="App">
        {scriptLoaded && (
          <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true}/>
        )}
    </div>
    );
}

export default MapPage;
