import React, { useState } from "react";
import { useQuery } from "react-query";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import { fetchUsers } from "../api/fetchUsers";

window.google = window.google ? window.google : {};

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: 37.775,
  lng: -122.419,
};

const GoogleMapComponent = () => {
  const [search, setSearch] = useState("");
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery(["users", search], () => fetchUsers(search), {
    enabled: !!search,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleSearch = () => {
    // This function will be called when the user clicks the search button
    // or presses Enter in the search input
  };

  if (isError) {
    return <div>Error fetching users.</div>;
  }

  const users = data.filter(({ latitude, longitude }) => latitude && longitude);

  return (
    <div>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for users..."
        />
        <button onClick={handleSearch}>Search</button>
        {isLoading ? <div>Loading...</div> : ""}
      </div>

      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {users.map((user) => {
            const position = {
              lat: parseFloat(user.latitude),
              lng: parseFloat(user.longitude),
            };

            return <MarkerF key={user.id} position={position} />;
          })}
        </GoogleMap>
      ) : (
        <div>Map Loading...</div>
      )}
    </div>
  );
};

export default GoogleMapComponent;
