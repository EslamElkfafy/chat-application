import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Images } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import Post from "../Post";
import Poster from "../_elements/Poster";
import axios from "axios";

export default function Blogs() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [ listOfPosts, setListOfPosts ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("posts/allposts");
      setListOfPosts(response.data)
    }
    const interval = setInterval(() => {
      fetchData()
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <div
        ref={btnRef}
        className="flex justify-center bg-blue-950  items-center border text-sm md:text-md text-white w-[100px] py-1 rounded-md cursor-pointer "
        onClick={onOpen}
      >
        <Images className=" size-4 md:size-5" /> حائط
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex flex-col w-full ">
            <div className="w-full flex items-center justify-between px-2 bg-blue-800 text-white relative h-[50px]">
              <p className="font-bold">حائط</p>
              <DrawerCloseButton backgroundColor={"red"} color={"white"} />
            </div>

            <div className="flex flex-col h-[450px]  md:h-[500px] overflow-auto">
              {listOfPosts.map((item, index) => (
                <Post key={index} item={item}/>
              ))}
            </div>
            <hr />
            <Poster />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
