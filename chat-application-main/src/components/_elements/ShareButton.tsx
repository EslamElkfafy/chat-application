import { Share2 } from "lucide-react";
import { useOptionContext } from "../../context/OptionContextProvider";
import { getColor } from "../../lib/getColor";

function ShareButton({ handleChange, reference}: any) {
  const {option} = useOptionContext()

  return (
    <label
      htmlFor="uploadFile1"
      className="p-1 cursor-pointer"
      style={{backgroundColor: getColor("mainButton"), color: getColor("textOfMainButton")}}
    >
      <Share2
      />
      <input 
        ref={reference}
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
