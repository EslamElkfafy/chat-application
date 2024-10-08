import { Share2 } from "lucide-react";
import { useOptionContext } from "../../context/OptionContextProvider";
import { getColor } from "../../lib/getColor";

function ShareButtonOfPrivate({ handleChange, reference}: any) {
  const {option} = useOptionContext()

  return (
    <label
      htmlFor="shareButtonOfPrivate"
      className="p-1 cursor-pointer"
      style={{backgroundColor: getColor("mainButton"), color: getColor("textOfMainButton")}}
    >
      <Share2
      />
      <input 
        ref={reference}
        type="file" 
        accept={option.supportedFiles.join(", ")}
        id="shareButtonOfPrivate" 
        className="hidden"  
        onChange={handleChange}
      />
    </label>
  );
}

export default ShareButtonOfPrivate;
