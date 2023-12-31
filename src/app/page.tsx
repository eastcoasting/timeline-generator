import { DropzoneDialog } from "./_components/Dropzone";
import { MapWrapper } from "./_components/MapWrapper";

export default async function Home() {
  return (
    <main className="h-full w-full bg-[#010011]">
      <DropzoneDialog />
      <MapWrapper />
      <div className="absolute bottom-4 z-50 flex w-full cursor-pointer justify-end px-8 text-white hover:text-[#3AA99F]">
        <a href="https://www.mowen.dev" target="_blank">
          M.O.
        </a>
      </div>
    </main>
  );
}
