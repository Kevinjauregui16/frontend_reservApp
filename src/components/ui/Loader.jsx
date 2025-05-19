import { BeatLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <BeatLoader color="#0070F3" size={20} />
    </div>
  );
}
