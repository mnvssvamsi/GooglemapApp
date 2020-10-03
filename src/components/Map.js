import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Navbar from './Navbar/Navbar'
import Modal from './Modal/Modal'
import './Map.css'
import compass from '../images/compass.jpg'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = React.useState(null);


  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

// ref used in panTo
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //used in search sends location
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  //closeHandler for Model
  const  closeHandler = ()=> {
      setSelected(null)
  }

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  // console.log(selected)

// search bar
  function Search({panTo}){
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 16.710661, lng: () => 81.095245 },
        radius: 100 * 1000,
      },
    });

    return (
      <div className="search">
        <Combobox onSelect={ async (address)=> {
            setValue(address, false);
            clearSuggestions();
        
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (error) {
              console.log(" Error: ", error);
            }
        }}  >
          <ComboboxInput
            value={value}
            onChange= { (e)=> {
              setValue(e.target.value)
            }}
            disabled={!ready}
            placeholder="Search your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );

  }
  // compass zoom
  function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img className='compass' src={compass} alt="compass" />
      </button>
    );
  }


  return (
    <div>
      <Navbar />
      <Locate panTo={panTo} />
      <Search panTo={panTo} />
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
        {selected ? <Modal lat= {selected.lat} lng={selected.lng}  close={closeHandler}  /> : null }
      </GoogleMap>
    </div>
  );
}
export default Map



