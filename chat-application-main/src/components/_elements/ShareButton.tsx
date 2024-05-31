import { Share2 } from "lucide-react";
import { useOptionContext } from "../../context/OptionContextProvider";

function ShareButton({ handleChange }: any) {
  const {option} = useOptionContext()

  return (
    <label
      htmlFor="uploadFile1"
      className="p-1 text-white bg-blue-700 cursor-pointer rounded"
    >
      <Share2
      />
      <input 
        type="file" 
        accept={option.supportedFiles.join(", ")}
        id="uploadFile1" 
        className="hidden"  
        onChange={handleChange}
      />
    </label>
  );
}

export default ShareButton;
