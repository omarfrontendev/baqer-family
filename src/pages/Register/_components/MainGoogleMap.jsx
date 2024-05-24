import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import styles from '../.module.scss';

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const MainGoogleMap = ({ onCloseMap, onChange, watch }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDi80ddjmq0ineWLqyk7q4NyiAm6ask2iM", // Replace with your Google Maps API key
  });

  const [location, setLocation] = useState(
    watch()?.company?.location?.lat ? watch()?.company?.location : null
  );
  const [map, setMap] = useState(null);

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
        map?.panTo({ lat: latitude, lng: longitude });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChange(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={18}
        onClick={handleMapClick}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default MainGoogleMap;