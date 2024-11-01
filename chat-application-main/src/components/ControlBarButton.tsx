import React, { useCallback, useEffect, useState } from 'react'
import { getColor } from '../lib/getColor';
import axios from 'axios';
import { useSocketContext } from '../context/SocketContextProvider';

interface ControlBarButtonProps {
  Icon: any;
  text: string | null;
  type: string;
  [key: string]: any;  // any additional props for the button
}
export const ControlBarButton : React.FC<ControlBarButtonProps> = ({Icon, text, type, ...props}) => {
  const [numberOfOnline, setNumberOfOnline] = useState(0);
  const { socket } = useSocketContext();
  useEffect(() => {
    if (type !== "RoomInfo") return;
    socket.on('increaseOnline', increaseOnline);
    socket.on('decreaseOnline', decreaseOnline);

    (async () => {
      try {
        const response = await axios.get('numberofonline');
        setNumberOfOnline(response.data);
      } catch (error) {
        console.error('Error fetching online number:', error);
      }
    })();
    return () => {
      socket.off('increaseOnline', increaseOnline);
    };
  }, []);
  const increaseOnline = useCallback(() => {
    setNumberOfOnline((prev) => prev + 1);
  }, []);
  const decreaseOnline = useCallback(() => {
    setNumberOfOnline((prev) => prev - 1);
  }, []);

  return (
    <button type="button"
        {...props}
        className="flex justify-center items-center border border-black text-sm md:text-md text-white w-[100px] py-1 cursor-pointer "
        style={{ backgroundColor: getColor("mainButton") }}
      >
        <Icon className=" size-4 md:size-5" /> {type !== "RoomInfo"? text : numberOfOnline}
      </button>
  )
}
