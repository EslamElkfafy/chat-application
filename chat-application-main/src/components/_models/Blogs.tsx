import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Images } from "lucide-react";

import { RefObject, useEffect, useRef, useState } from "react";
import Post from "../Post";
import Poster from "../_elements/Poster";
import axios from "axios";
import FormatText from "../../lib/formatText";
import { getColor } from "../../lib/getColor";
import CloseIcon from "@mui/icons-material/Close";

export default function Blogs({
  controlBarRef,
  setBlogsIsOpen,
}: {
  controlBarRef: RefObject<HTMLDivElement | null>;
  setBlogsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [listOfPosts, setListOfPosts] = useState([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const { signal } = controller; // Get the signal from the controller
    const fetchData = async () => {
      try {
        const response = await axios.get("posts/allposts", { signal });
        console.log(response.data);
        response.data.forEach((post: any) => {
          if (post.text)
            post.text = <FormatText text={post.text} key={post._id} />;
        });
        setListOfPosts(response.data);
      } catch (e: any) {
        console.error(e.message);
      }
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
    if (
      listRef.current &&
      controlBarRef.current &&
      !listRef.current.contains(event.target) &&
      !controlBarRef.current.contains(event.target)
    ) {
      setBlogsIsOpen(false);
    }
  };
  return (
    <>
      <div
          ref={listRef}
          className={`flex flex-col w-[21.25rem] w-max-554:w-[70%] absolute right-0 top-0 bottom-[1.9375rem] overflow-auto border border-black`}
          style={{ backgroundColor: getColor("listsBackground") }}
        >
          <div className="flex flex-col w-full">
            <div
              className="w-full flex items-center justify-between px-2  relative h-[2.5rem]"
              style={{
                backgroundColor: getColor("mainColor"),
                color: getColor("textOfMainColor"),
              }}
            >
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
              className="flex flex-col h-[calc(100vh-7.25rem)] overflow-auto"
              ref={scrollRef}
            >
              {listOfPosts.map((item: any) => (
                <Post key={item._id} item={item} />
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
