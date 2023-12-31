"use client";

import { timelineDateRangeAtom } from "@/jotai/atoms";
import { Map } from "./Map";
import data from "@/static/ttt.json";
import { useAtom } from "jotai";

interface Props {}

export const MapWrapper = (props: Props): JSX.Element => {
  const {} = props;

  const [timelineDateRange, setTimelineDateRange] = useAtom(
    timelineDateRangeAtom,
  );

  return (
    <div>
      <div className="absolute z-10 top-10 flex w-full justify-center text-2xl text-white font-mono">
        {timelineDateRange ? timelineDateRange : null}
      </div>
      <Map data={data} />
    </div>
  );
};
