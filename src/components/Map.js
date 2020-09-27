import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Navbar from './Navbar/Navbar'
import Modal from './Modal/Modal'

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";


const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const center = {
  lat: 16.710661,
  lng: 81.095245,
};

const options = {
  zoomControl: true
}
const libraries = ["places"]

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);
  const  closeHandler = ()=> {
      setSelected(null)
  }

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  // console.log(selected)

  return (
    <div>
      {/* <Locate panTo={panTo} />
      <Search panTo={panTo} /> */}
      <Navbar />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? <Modal lat= {selected.lat} lng={selected.lng}  close={closeHandler}  /> : null}
      </GoogleMap>
    </div>
  );
}
export default Map