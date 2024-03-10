"use client";
import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  type LatLng,
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

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState<LatLng>(center);
  const handleSelected = (location: LatLng) => {
    setSelected(location);
  };

  return (
    <>
      <div className="places-container">
        {/* <PlacesAutocomplete setSelected={handleSelected} /> */}
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

export const PlacesAutocomplete = ({
  setSelected,
}: {
  setSelected: (result: string | undefined) => void;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]!);
    setSelected(results[0]?.formatted_address);
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input w-full rounded-xl border border-primary-200  p-2 text-primary-500 placeholder-primary-400"
        placeholder="location"
      />
      <ComboboxPopover className=" z-40">
        <ComboboxList
          className={`overflow-hidden rounded-md border border-neutral-200 bg-white`}
        >
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className={`p-2 text-primary-500 hover:cursor-pointer hover:bg-primary-50`}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
