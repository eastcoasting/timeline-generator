import { Fragment, useEffect, useRef, useState } from "react";
import { HexColorPicker, RgbaColor, RgbaColorPicker } from "react-colorful";
import { PopoverContent } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  color: string;
  setColor: (color: string) => void;
}

export const ColorPicker = (props: Props): JSX.Element => {
  const { color, setColor } = props;

  return (
    <Popover>
      <PopoverTrigger className="rounded border border-slate-300 bg-slate-100 px-[0.2rem] py-[0.15rem] dark:bg-slate-950">
        <div
          className="h-6 w-8 rounded"
          style={{
            backgroundColor: color,
          }}
        ></div>
      </PopoverTrigger>

      <PopoverContent align="end">
        <div className="rounded border border-slate-300 bg-slate-100 p-2 shadow-2xl dark:bg-slate-950">
          <HexColorPicker
            className="rgbaColorPicker absolute"
            color={color}
            onChange={(newColor) => {
              setColor(newColor);
            }}
          />
          <div></div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
