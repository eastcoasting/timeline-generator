"use client";

import { timelineDateRangeAtom } from "@/jotai/atoms";
import { Map } from "./Map";
import { useAtom } from "jotai";

export const MapWrapper = (): JSX.Element => {
  const [timelineDateRange, setTimelineDateRange] = useAtom(
    timelineDateRangeAtom,
  );

  return (
    <div>
      <div className="absolute top-10 z-10 flex w-full justify-center font-mono text-2xl text-white">
        {timelineDateRange ? timelineDateRange : null}
      </div>
      <Map />
    </div>
  );
};
