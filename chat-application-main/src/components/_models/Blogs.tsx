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
import { formatText } from "../../lib/formatText";
import { getColor } from "../../lib/getColor";
import CloseIcon from "@mui/icons-material/Close";

export default function Blogs({controlBarRef,blogsIsOpen , setBlogsIsOpen, resetLists}: {controlBarRef: RefObject<HTMLDivElement | null>, blogsIsOpen: boolean, setBlogsIsOpen: React.Dispatch<React.SetStateAction<boolean>>, resetLists: () => void}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [listOfPosts, setListOfPosts] = useState([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const { signal } = controller; // Get the signal from the controller
    const fetchData = async () => {
      const response = await axios.get("posts/allposts", { signal });
      await Promise.all(
        response.data.map(async (post: any) => {
          post.text = await formatText(post.text);
        })
      );
      setListOfPosts(response.data);
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if ((listRef.current && controlBarRef.current) && !listRef.current.contains(event.target) && !controlBarRef.current.contains(event.target)) {
      setBlogsIsOpen(false);
    }
  };
  return (
    <>
      <div
        className="flex justify-center   items-center border border-black text-sm md:text-md text-white w-[100px] py-1 cursor-pointer "
        style={{backgroundColor: getColor("mainButton")}}
        onClick={() => {
          resetLists();
          setBlogsIsOpen(true)}}
      >
        <Images className=" size-4 md:size-5" /> حائط
      </div>
      <div ref={listRef} className={`flex flex-col w-[340px] absolute right-0 top-0 bottom-[31px] overflow-auto border border-black ${!blogsIsOpen ? "hidden" : ""}`} style={{backgroundColor: getColor("listsBackground")}}>
        <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-between px-2  relative h-[40px]" style={{backgroundColor: getColor("mainColor"), color: getColor("textOfMainColor")}}>
              <p className="font-bold">حائط</p>
              <button
            onClick={() => setBlogsIsOpen(false)}
            className="p-2 border border-black rounded-lg"
            style={{
              backgroundColor: getColor("closeButton"),
              color: getColor("textOfCloseButton"),
            }}
          >
            <CloseIcon sx={{ fontSize: 20, fontWeight: "bold" }} />
          </button>
            </div>

            <div
              className="flex flex-col h-[450px]  md:h-[500px] overflow-auto"
              ref={scrollRef}
            >
              {listOfPosts.map((item, index) => (
                <Post key={index} item={item} />
              ))}
            </div>
            <hr />
            <Poster />
          </div>
        </div>
      {/* <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          
        </DrawerContent>
      </Drawer> */}
    </>
  );
}
