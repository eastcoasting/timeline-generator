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

export const mapOptionsAtom = atom({
  globeImageUrl: "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  arcColor: "#BC5215",
});

export const hideControlsAtom = atom<boolean>(true);
