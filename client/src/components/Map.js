import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'; // Type checking
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'fixed'
};

function Map({results, activeItem, setActiveItem}) {

  const [googleMap, setGoogleMap] = useState()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAZXwJC_vRUIBfoj7V0cD9iPaQzjFP2F-Y"
  })

  const onLoad = useCallback(function callback(map) {
    setGoogleMap(map);
    const bounds = new window.google.maps.LatLngBounds(
      // Roughly center on continental USA
      new window.google.maps.LatLng(49.4912902, -127.698959), 
      new window.google.maps.LatLng(25.078091,-76.5026699)
    );
    map.fitBounds(bounds);
  }, [])

  const placePins = () => {
    const latPadding = 0.01;
    const lonPadding = 0.01;

    if ('data' in results && results.data.length > 0) {
      const data = results.data.filter(element => element.type === "college_score_card_school")

      let minLat = data[0].attributes.latitude;
      let minLon = data[0].attributes.longitude;
      let maxLat = data[0].attributes.latitude;
      let maxLon = data[0].attributes.longitude;
      
      data.forEach(element => {
        minLat = Math.min(minLat, element.attributes.latitude);
        minLon = Math.min(minLon, element.attributes.longitude);
        maxLat = Math.max(maxLat, element.attributes.latitude);
        maxLon = Math.max(maxLon, element.attributes.longitude);
      });

      googleMap.fitBounds(new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(minLat - latPadding, minLon - lonPadding), 
        new window.google.maps.LatLng(maxLat + latPadding, maxLon + lonPadding)
      ));

      return data.map((place) => {
        const animation = place.id === activeItem ? window.google.maps.Animation.BOUNCE : null
        return (
        <Marker
          key={`Map_Pin_${place.id}`}
          animation={animation}
          onMouseOver={() => setActiveItem(place.id)}
          position={{lat: place.attributes.latitude, lng: place.attributes.longitude}}
        />)
      })
    }
  }

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad}>
      {placePins()}
    </GoogleMap>
  ) : <div>Error loading the map.</div>
}

export default React.memo(Map)

Map.propTypes = { // Type checking
  results: PropTypes.object, // Could do more validation of contents
  activeItem: PropTypes.string,
  setActiveItem: PropTypes.func
};