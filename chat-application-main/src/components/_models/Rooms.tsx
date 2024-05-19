import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {  Video } from "lucide-react";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContextProvider";
import { useRef, useState, useEffect } from "react";
import RoomContainer from "../RoomContainer";
import CreateRoomModule from "./CreateRoomModule";

export default function Rooms() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ builded, setBuilded ] = useState(false);
  const [ rooms, setRooms ]: [ rooms: any, setRooms: any] = useState([])
  const btnRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocketContext()
  if (!builded)
  {
    socket.on('audioStream', (audioData : any) => {
      var newData = audioData.split(";");
      newData[0] = "data:audio/ogg;";
      newData = newData[0] + newData[1];
  
      var audio = new Audio(newData);
      if (!audio || document.hidden) {
          return;
      }
      audio.play();
  });
  setBuilded(true)
    
  }
  const joinRoom = () => {
    
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then((stream) => {
        var madiaRecorder = new MediaRecorder(stream);
        var audioChunks: any = [];

        madiaRecorder.addEventListener("dataavailable", function (event) {
            audioChunks.push(event.data);
        });
    

        madiaRecorder.addEventListener("stop", function () {
            var audioBlob = new Blob(audioChunks);
            audioChunks = [];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(audioBlob);
            fileReader.onloadend = function () {
                var base64String = fileReader.result;
                socket.emit("audioStream", base64String);
            };

            madiaRecorder.start();
            setTimeout(function () {
                madiaRecorder.stop();
            }, 1000);
        });

        madiaRecorder.start();
        setTimeout(function () {
            madiaRecorder.stop();
        }, 1000);
    })
    .catch((error) => {
        console.error('Error capturing audio.', error);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/rooms")
      setRooms(response.data.payload)
    }
    fetchData()
  }, [rooms])
  return (
    <>
      <div
        ref={onOpen}
        className="flex justify-center bg-blue-950 items-center border text-white w-[100px] text-sm md:text-md py-1 rounded-md cursor-pointer  "
        onClick={onOpen}
      >
        <Video  className=" size-4 md:size-5" /> {"الغرف"}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-between px-2  bg-blue-800 text-white relative h-[50px]">
              <p className="font-bold">غرف الدردشه: 9</p>
              <DrawerCloseButton backgroundColor={"red"} color={"white"} />
            </div>
            <div className="w-full bg-blue-950 py-1 px-2">
              <CreateRoomModule key={2}/>
            </div>
            <div className="flex flex-col overflow-auto h-[550px]" onClick={joinRoom}>
              {
                rooms.map((room: any)=>(
                  <>
                  <RoomContainer key={room._id}/>
                  <hr key={room._id}/>
                  </>
                ))
              }
            </div>
          </div>

        </DrawerContent>
      </Drawer>
    </>
  );
}
