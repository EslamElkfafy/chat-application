import { Share2 } from "lucide-react";
import { useUserContext } from "../../context/UserContextProvider";
import axios from "axios";

function ShareButton() {
  const { user } = useUserContext()
  const handleChange = async (event: any) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    console.log("-------------")
    console.log(files)
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        const data = await response.json()

        
        const newPost = {
          userId: user._id,
          url: `http://localhost:3000/${data.path}`,
          type: data.type,
          arrivalTime: Date.now()
        };
        await axios.post("http://localhost:3000/api/posts/addpost", newPost)
      
        
      } else {
        console.error('Failed to upload file');
        // Handle failure
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
}
  return (
    <label
      htmlFor="uploadFile1"
      className="p-1 text-white bg-blue-700 cursor-pointer rounded"
    >
      <Share2
      />
      <input type="file" accept="image/png, video/mp4, audio/mp3"id="uploadFile1" className="hidden"  onChange={handleChange}/>
    </label>
  );
}

export default ShareButton;
