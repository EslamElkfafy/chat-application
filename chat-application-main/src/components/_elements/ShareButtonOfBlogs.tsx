import { Share2 } from "lucide-react";
import { useOptionContext } from "../../context/OptionContextProvider";
import { getColor } from "../../lib/getColor";

function ShareButtonOfBlogs({ handleChange, reference}: any) {
  const {option} = useOptionContext()

  return (
    <label
      htmlFor="shareButtonOfBlogs"
      className="p-1 cursor-pointer"
      style={{backgroundColor: getColor("mainButton"), color: getColor("textOfMainButton")}}
    >
      <Share2
      />
      <input 
        ref={reference}
        type="file" 
        accept={option.supportedFiles.join(", ")}
        id="shareButtonOfBlogs" 
        className="hidden"  
        onChange={handleChange}
      />
    </label>
  );
}

export default ShareButtonOfBlogs;
