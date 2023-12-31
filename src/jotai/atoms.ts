import { atom } from "jotai";

export const timelineAtom = atom<
  | {
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
    }[]
  | undefined
>(undefined);

export const timelineDateRangeAtom = atom<string | null>(null);
