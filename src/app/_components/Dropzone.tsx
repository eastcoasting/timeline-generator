/* eslint-disable */
// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { timelineAtom, timelineDateRangeAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const DropzoneDialog = (): JSX.Element => {
  const [dialogOpenState, setDialogOpenState] = useState(true);
  const [timeline, setTimeline] = useAtom(timelineAtom);
  const [timelineDateRange, setTimelineDateRange] = useAtom(
    timelineDateRangeAtom,
  );

  const { isDragActive } = useDropzone();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    let allData = [];
    const dateRange: Date[] = [];

    Promise.all(
      acceptedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            if (!isValidFileName(file?.name)) {
              console.log("Invalid file name:", file.name);
              reject(new Error("Invalid file name"));
              return;
            }

            const fileDate = parseDateFromFileName(file.name);
            if (fileDate) {
              dateRange.push(fileDate);
            }

            const reader = new FileReader();
            reader.onabort = () => {
              console.log("File reading was aborted");
              reject(new Error("File reading was aborted"));
            };
            reader.onerror = () => {
              console.log("File reading has failed");
              reject(new Error("File reading has failed"));
            };
            reader.onload = () => {
              try {
                const fileContents = reader.result;
                if (typeof fileContents === "string") {
                  const jsonData = JSON.parse(fileContents);
                  const extractedData = extractRelevantData(jsonData);
                  resolve(extractedData);
                } else {
                  throw new Error("File content is not a string");
                }
              } catch (e) {
                console.error("Error processing file:", file.name, e);
                reject(e);
              }
            };
            reader.readAsText(file);
          }),
      ),
    )
      .then((results) => {
        allData = results.flat();
        allData = sortDataByTime(allData);
        allData = transformDataToPairs(allData);
        if (dateRange.length > 0) {
          dateRange.sort((a, b) => a.getTime() - b.getTime());
          const startDate = dateRange[0];
          const endDate = dateRange[dateRange.length - 1];

          let rangeString;

          if (startDate === endDate && startDate !== undefined) {
            rangeString = `${startDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}`;
          } else if (startDate !== undefined && endDate !== undefined) {
            rangeString = `${startDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })} to ${endDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}`;
          }

          setTimeline(allData);
          setTimelineDateRange(rangeString ?? null);
          console.log(rangeString);
        }
      })
      .catch((error) => {
        console.error("Error processing files:", error);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="">
      <Dialog
        open={dialogOpenState}
        onOpenChange={setDialogOpenState}
        modal={false}
      >
        <DialogTrigger className="absolute left-10 top-10 z-50" asChild>
          <Button
            size={"lg"}
            variant={"outline"}
            className={`text-black  ${
              dialogOpenState ? "invisible" : "visible"
            }`}
          >
            {timeline === undefined ? "Add Data" : "Edit Data"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a local timeline file.</DialogTitle>
            <DialogDescription className="my-4" asChild>
              <div>
                This should be a .json file downloaded from Google Takeout. This
                can be found by:
                <ol className="list-inside list-decimal indent-4">
                  <li>
                    Downloading data from{" "}
                    <a
                      href="https://takeout.google.com/settings/takeout"
                      target="_blank"
                      className="text-[#3AA99F]"
                    >
                      Google Takeout
                    </a>
                  </li>
                  <li>Unzipping the file</li>
                  <li>
                    Dragging or dropping a monthly, or series of months of
                    activity data.
                  </li>
                </ol>
              </div>
            </DialogDescription>
            <div
              {...getRootProps()}
              className={`rounded-md p-20 text-center text-base outline-dashed outline-2 outline-[#879A39] transition-all hover:cursor-pointer hover:bg-[#4385BE]/20 ${
                isDragActive ? "bg-[#4385BE]/50" : "bg-[#4385BE]/10"
              }`}
            >
              <input {...getInputProps()} />
              <p>
                {" "}
                {isDragActive
                  ? "Drop file to import a timeline"
                  : "Drag and drop a file or click to upload"}
              </p>
            </div>
          </DialogHeader>
          <DialogClose asChild>
            <div className="flex justify-between">
              <Button
                variant={"destructive"}
                onClick={(e) => {
                  if (timeline !== undefined) {
                    setTimeline(undefined);
                    setTimelineDateRange(null);
                  }
                  e.preventDefault();
                }}
                disabled={timeline === undefined}
              >
                Clear Data
              </Button>
              <Button>Close</Button>
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function isValidFileName(fileName: string) {
  const regex =
    /^\d{4}_(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)\.json$/i;
  return regex.test(fileName);
}

function convertE7(value: number) {
  return value / 10000000;
}

function extractRelevantData(jsonData: { timelineObjects: any[] }) {
  const extractedData: {
    latitude: number;
    longitude: number;
    startTimestamp: any;
  }[] = [];
  jsonData.timelineObjects.forEach(
    (item: {
      placeVisit: {
        location: { latitudeE7: any; longitudeE7: any };
        duration: { startTimestamp: any };
      };
    }) => {
      if (item.placeVisit && item.placeVisit.location) {
        const { latitudeE7, longitudeE7 } = item.placeVisit.location;
        const latitude = convertE7(latitudeE7);
        const longitude = convertE7(longitudeE7);
        const startTimestamp = item.placeVisit.duration.startTimestamp;
        extractedData.push({ latitude, longitude, startTimestamp });
      }
    },
  );
  return extractedData;
}

function sortDataByTime(dataArray: any[]) {
  return dataArray.sort(
    (
      a: { startTimestamp: string | number | Date },
      b: { startTimestamp: string | number | Date },
    ) =>
      new Date(a.startTimestamp).getTime() -
      new Date(b.startTimestamp).getTime(),
  );
}

function transformDataToPairs(dataArray: string | any[]) {
  const transformedData = [];
  for (let i = 0; i < dataArray.length - 1; i++) {
    const start = dataArray[i];
    const end = dataArray[i + 1];
    transformedData.push({
      startLat: start.latitude,
      startLng: start.longitude,
      endLat: end.latitude,
      endLng: end.longitude,
    });
  }
  return transformedData;
}

const monthNames = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function parseDateFromFileName(fileName: string) {
  const match = fileName.match(/^(\d{4})_(\w+)\.json$/i);
  if (match && match[1] && match[2]) {
    const year = parseInt(match[1], 10);
    const monthIndex = monthNames.indexOf(match[2].toUpperCase());
    return new Date(year, monthIndex);
  }
  return null;
}
