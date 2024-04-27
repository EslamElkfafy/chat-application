import { Plus } from "lucide-react";

function PlusButton() {
  return (
    <label
      htmlFor="uploadFile1"
      className="p-1 text-white bg-blue-700 cursor-pointer rounded"
    >
      <Plus />
      <input type="file" id="uploadFile1" className="hidden" />
    </label>
  );
}

export default PlusButton;
