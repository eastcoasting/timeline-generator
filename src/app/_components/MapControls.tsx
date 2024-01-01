"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { ColorPicker } from "./ColorPicker";
import { mapOptionsAtom, hideControlsAtom } from "@/jotai/atoms";


export const MapControls = (): JSX.Element => {

  const [mapOptions, setMapOptions] = useAtom(mapOptionsAtom);
  const [hideControls, setHideControls] = useAtom(hideControlsAtom);

  const controlOptions = [
    {
      label: "Blue Marble",
      value: "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    },
    {
      label: "Dark Earth",
      value: "//unpkg.com/three-globe/example/img/earth-dark.jpg",
    },
    {
      label: "Earth at Night",
      value: "//unpkg.com/three-globe/example/img/earth-night.jpg",
    },
  ];

  return (
    <div className="absolute right-10 top-10 z-50 flex flex-col space-y-4">
      {hideControls ? null : (
        <>
          <Select
            onValueChange={(value) => {
              setMapOptions((prevState) => {
                return {
                  arcColor: prevState.arcColor,
                  globeImageUrl: value,
                };
              });
            }}
            value={mapOptions.globeImageUrl}
          >
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue
                placeholder="Globe Map"
                className="z-50 capitalize"
              />
            </SelectTrigger>
            <SelectContent className="capitalize">
              {controlOptions.map((option) => {
                return (
                  <SelectItem value={option.value}>{option.label}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="flex w-full justify-end">
            <ColorPicker
              color={mapOptions.arcColor}
              setColor={(newColor: string) => {
                setMapOptions((prevState) => {
                  return {
                    arcColor: newColor,
                    globeImageUrl: prevState.globeImageUrl,
                  };
                });
              }}
            />
          </div>
        </>
      ) }
    </div>
  );
};
