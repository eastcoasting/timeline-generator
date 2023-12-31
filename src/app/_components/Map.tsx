"use client";

import { timelineAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import Globe from "react-globe.gl";

interface Props {
  data: any;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export const Map = (props: Props): JSX.Element => {
  const { data } = props;

  const [timeline, setTimeline] = useAtom(timelineAtom);

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
    const minDistance = 50; // Minimum distance to include an item, in kilometers

    if (timeline !== undefined) {
      const arcsData = timeline
        // .filter((obs) => {
        //   const distance = haversineDistance(
        //     obs.startLat,
        //     obs.startLng,
        //     obs.endLat,
        //     obs.endLng,
        //   );
        //   return distance > minDistance;
        // })
        .map((obs) => ({
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
