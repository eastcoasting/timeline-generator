/* eslint-disable */
// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { hideControlsAtom, mapOptionsAtom, timelineAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import Globe, { GlobeMethods } from "react-globe.gl";

export const Map = (): JSX.Element => {
  const [timeline] = useAtom(timelineAtom);
  const [mapOptions] = useAtom(mapOptionsAtom);
  const [hideControls] = useAtom(hideControlsAtom);

  const globeRef = useRef<GlobeMethods | undefined>();

  const [arcData, setArcData] = useState<
    | {
        startLat: number;
        startLng: number;
        endLat: number;
        endLng: number;
        color: (string | undefined)[];
      }[]
    | undefined
  >(undefined);

  useEffect(() => {
    if (timeline !== undefined) {
      const arcsData = timeline.map((obs) => ({
        ...obs,
        color: [mapOptions.arcColor, mapOptions.arcColor],
      }));

      console.log(arcsData);
      setArcData(arcsData);
    } else {
      setArcData(undefined);
    }
  }, [timeline, mapOptions]);

  const downloadImage = () => {
    if (globeRef.current) {
      requestAnimationFrame(() => {
        if (globeRef.current === undefined) return;

        const renderer = globeRef.current?.renderer();

        renderer.render(globeRef.current.scene(), globeRef.current.camera());
        const url = renderer.domElement.toDataURL("image/png");

        const link = document.createElement("a");
        link.download = "globe.png";
        link.href = url;
        link.click();
      });
    }
  };

  return (
    <>
      {hideControls ? null : (
        <Button
          className="absolute bottom-10 left-10 z-50"
          variant={"outline"}
          size={"sm"}
          onClick={downloadImage}
        >
          Download
        </Button>
      )}
      <Globe
        ref={globeRef}
        globeImageUrl={mapOptions.globeImageUrl}
        arcsData={arcData}
        arcColor={"color"}
        arcStroke={0.25}
        rendererConfig={{ antialias: false }}
      />
    </>
  );
};
