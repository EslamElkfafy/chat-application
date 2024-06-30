import { Image } from "lucide-react"

function RoomImage() {
  return (
    <label
      htmlFor="uploadFile1"
      className="p-1 text-white bg-blue-700 cursor-pointer rounded"
    >
      <Image/>
      <input type="file" id="uploadFile1" className="hidden" />
    </label>
  )
}

export default RoomImage
