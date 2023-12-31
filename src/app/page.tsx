import { DropzoneDialog } from "./_components/Dropzone";
import { MapWrapper } from "./_components/MapWrapper";

export default async function Home() {
  return (
    <main className="bg-[#010011] h-full w-full">
      <DropzoneDialog />
      <MapWrapper />
    </main>
  );
}
