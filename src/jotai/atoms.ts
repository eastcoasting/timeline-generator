import { atom } from "jotai";

export const timelineAtom = atom<
  | {
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
      color: (string | undefined)[];
    }[]
  | undefined
>(undefined);

export const timelineDateRangeAtom = atom<string | null>(null);
