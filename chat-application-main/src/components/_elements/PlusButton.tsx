import { Plus } from "lucide-react";
import { forwardRef } from "react";

const PlusButton = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({onChange}, ref) => {
  return (
    <label
      htmlFor="uploadFile1"
      className="p-1 text-white bg-blue-700 cursor-pointer rounded"
    >
      <Plus />
      <input type="file" id="uploadFile1" accept="image/gif" className="hidden" ref={ref} onChange={onChange} />
    </label>
  );
})

export default PlusButton;
