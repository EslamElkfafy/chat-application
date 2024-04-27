import { Share2 } from "lucide-react";

function ShareButton() {
  return (
    <label
      htmlFor="uploadFile1"
      className="p-1 text-white bg-blue-700 cursor-pointer rounded"
    >
      <Share2
      />
      <input type="file" id="uploadFile1" className="hidden" />
    </label>
  );
}

export default ShareButton;
