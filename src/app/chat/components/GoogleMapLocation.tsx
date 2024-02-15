"use client";
import React from "react";
import { useJsApiLoader, GoogleMap, MarkerF, Autocomplete } from "@react-google-maps/api";
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

function MyComponent() {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: 13.736717, lng: 100.523186 }), []);
  const [map, setMap] = useState<google.maps.Map>();
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral>(mapCenter);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
    }),
    [],
  );
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBzAKU-lzdnputUmRhYdRF3KrpMoHHmr4g" as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  const onClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat && lng) {
      setSelectedPosition({
        lat: lat,
        lng: lng,
      });
    }
  };

  return (
    <div className="h-full w-full">
      <Autocomplete>
        <Input type="text" />
      </Autocomplete>

      <div className="w-fit">
        <p>This is Sidebar...</p>
      </div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "800px", height: "800px" }}
        onLoad={(map) => setMap(map)}
        onClick={onClick}
      >
        <MarkerF position={selectedPosition} />
      </GoogleMap>
    </div>
  );
}

export default React.memo(MyComponent);
