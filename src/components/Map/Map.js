import React from "react";
import { useEffect, useState } from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import * as data from "../../database/db.json";

const Map = () => {
  const [facilities, setFacilities] = useState([]);
  const [facilityLocation, setFacilityLocation] = useState({});
  const [facilityName, setFacilityName] = useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const fetched = await fetch("http://localhost:8000/results", {
        method: "GET",
      });
      const res = await fetched.json();
      setFacilities(res);
      console.log(res);

      // facilities.map((facility) => {
      //   const lat = facility.lat_long[0];
      //   const lng = facility.lat_long[1];

      //   return <Marker
      //   key={facility.name}
      //   position={lat,lng}
      //   onClick={() => onSelect(item)}
      // />
      // });

      const counties = res;
      counties.map((county) => console.log(county.county));

      const county = res;
      county.map((county_name) => console.log(county_name.county_name));

      const sub_counties = res;
      sub_counties.map((sub_county_name) =>
        console.log(sub_county_name.sub_county_name)
      );

      const constituency = res;
      constituency.map((constituency_name) =>
        console.log(constituency_name.constituency_name)
      );

      const ward = res;
      ward.map((ward_name) => console.log(ward_name.ward_name));
    } catch (err) {
      console.error(err.message);
    }
  };

  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    // lat: -0.023559,
    // lng: 37.906193,
    lat: -1.286389,
    lng: 36.817223,
  };

  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  const locations = [
    {
      name: "Migori",
      location: {
        lat: -1.068884,
        lng: 34.47061,
      },
    },
    {
      name: "Kisii",
      location: {
        lat: -0.680482,
        lng: 34.777061,
      },
    },
    {
      name: "Kisumu",
      location: {
        lat: -0.091702,
        lng: 34.767956,
      },
    },
    {
      name: "Nyamira",
      location: {
        lat: -0.566941,
        lng: 34.934123,
      },
    },
    {
      name: "Nairobi",
      location: {
        lat: -1.286389,
        lng: 36.817223,
      },
    },
  ];

  return (
    <LoadScript googleMapsApiKey="AIzaSyBBIG5y3qrmQcfLg7X0FkM06O_71S7UDts">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {/* {locations.map((item) => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
            />
          );
        })} */}

        {facilities.map((facility, i) => (
          <>
            <Marker
              key={i}
              position={{
                lat: facility.lat_long[0],
                lng: facility.lat_long[1],
              }}
              onClick
              
            />
            <InfoWindow
              position={{
                lat: facility.lat_long[0],
                lng: facility.lat_long[1],
              }}
              clickable={true}
              onCloseClick={() => setSelected({})}
              onClick={() => onSelect(facility)}
            >
              <p>{facility.name}</p>
              {/* <p>{facility.lat_long}</p> */}
            </InfoWindow>
          </>
        ))}

        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p>{selected.name}</p>
          </InfoWindow>
        )}
        {currentPosition.lat && <Marker position={currentPosition}></Marker>}
        {currentPosition.lat ? (
          <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true}
          />
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
