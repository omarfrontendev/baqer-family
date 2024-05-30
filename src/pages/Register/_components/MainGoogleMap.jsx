import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import styles from '../.module.scss';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MainGoogleMap = ({ onCloseMap, onChange, watch }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDGnjcgnojm_7IimdzBTnlhUgpwzhfv-1I", // Replace with your Google Maps API key
  });

  const [location, setLocation] = useState(
    watch()?.company?.location?.lat ? watch()?.company?.location : null
  );
  const [currentLocation, setCurrentLocation] = useState(null)
  const [map, setMap] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ lat, lng });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newCenter = { lat, lng };
          setLocation(newCenter);
          map.panTo(newCenter);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation && !watch()?.location?.lat) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setCurrentLocation({ lat: latitude, lng: longitude });
        map?.panTo({ lat: latitude, lng: longitude });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoaded ? (
    <div className={styles.map__container}>
      <div className={styles.overlay}></div>
      <button type="button" onClick={onCloseMap} className={styles.close__btn}>
        <MdOutlineClose />
      </button>
      <button
        type="button"
        onClick={handleGetCurrentLocation}
        className={styles.back__btn__location}
      >
        <MdMyLocation />
      </button>
      <button
        type="button"
        className={styles.back__marker__btn}
        onClick={() => map.panTo(location)}
      >
        <FaLocationArrow />
      </button>
      <div className={styles.map}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={15}
          disableDefaultUI={true}
          onClick={handleMapClick}
          onLoad={(map) => setMap(map)}
          options={{
            disableDefaultUI: true, // Disable default UI
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              // Add more style rules as needed
            ],
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={location} />
        </GoogleMap>
      </div>
      <div className={styles.latLngBox}>
        <p>lat: {location?.lat}</p>
        <p>lng: {location?.lng}</p>
      </div>
      <button
        type="button"
        className={styles.confirm}
        onClick={() => {
          setConfirm(true);
          onChange(location)
          onCloseMap();
        }}
      >
        Confirm
      </button>
    </div>
  ) : (
    <></>
  );
};

export default MainGoogleMap;