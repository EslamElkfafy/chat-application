import { useState } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import axios from "axios";

function UploadButton() {
  const { user, setUser } = useUserContext()
  const handleFileInputChange = async (event : any) => {
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

        // Access the filename from the response
        
        const updatedData = {...user, img : `http://localhost:3000/${data.path}`};

      
        if (user._id !== -1) {
          const response = await axios.put(`http://localhost:3000/api/users/${user._id}`, updatedData)
          setUser(response.data)
        }else {
          setUser(updatedData)
        }
      } else {
        console.error('Failed to upload file');
        // Handle failure
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  return (
    <label
      htmlFor="uploadFile1"
      className="bg-gray-50  border border-gray-700 rounded-md text-sm  py-1.5 outline-none w-full   cursor-pointer mx-auto block font-[sans-serif]"
    >
      <div className="px-1 flex items-center  w-full" >
      <img src={user.img} className="w-5 h-5"/>
      <p className="text-center w-full font-bold text-gray-500">        تغير الصوره</p>
      </div>
      <input type="file" id="uploadFile1" className="hidden" accept="image/png" onChange={handleFileInputChange}/>
    </label>
  );
}

export default UploadButton;
