"use client";

import { timelineAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import Globe from "react-globe.gl";

export const Map = (): JSX.Element => {
  const [timeline] = useAtom(timelineAtom);

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
        color: ["#BC5215", "#BC5215"],
      }));

      console.log(arcsData);
      setArcData(arcsData);
    } else {
      setArcData(undefined);
    }
  }, [timeline]);

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      arcsData={arcData}
      arcColor={"color"}
      arcStroke={0.25}
      // arcDashLength={() => Math.random()}
      // arcDashGap={() => Math.random()}
      // arcDashAnimateTime={() => Math.random(x) * 4000 + 500}
    />
  );
};
