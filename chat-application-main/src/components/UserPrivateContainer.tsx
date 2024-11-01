import { useEffect, useRef, useState } from "react";
import Flags from "react-country-flag";
import axios from "axios";
import { useUserContext } from "../context/UserContextProvider";
import CloseIcon from "@mui/icons-material/Close";
import { getColor } from "../lib/getColor";

function UserPrivateContainer({
  userId,
  message,
}: {
  userId: any;
  message: any;
}) {
  const { user } = useUserContext();
  const [data, setData]: any = useState(null);
  const [render, setRender] = useState(false);
  const imgStyle = data
    ? {
        borderLeft: `4px solid ${
          data.status !== "connect"
            ? "yellow"
            : data.chatBlock || data.infoBlock
            ? "red"
            : "green"
        }`,
      }
    : undefined;
  // console.log(render)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${userId}`);
      setData(response.data);
    };
    fetchData();
  }, []);
  const handleDelete = () => {
    axios
      .delete(`users/deleteprivate/${user._id}`, {
        data: { userId },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setRender((prev) => !prev);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div
      className="flex justify-between items-center border cursor-pointer bg-[#fafafa]"
      // onClick={() => {
      //   if (onClick) onClick();
      // }}
    >
      <div className="flex gap-x-1">
        <img
          src={import.meta.env.VITE_API_BASE_URL + data?.img}
          className="w-14 min-h-12 max-h-16 object-cover"
          style={imgStyle}
        />
        <div className="flex flex-col justify-between py-2 h-full">
          <p
            style={{
              color: data?.nameColor,
              backgroundColor: data?.backgroundColor,
            }}
          >
            {data?.name}
          </p>
          <p style={{ color: "#888888" }}>
            {message.description ? message.description : ".."}
          </p>
        </div>
      </div>
      {/* <Flags countryCode="sa" svg /> */}
      <button
        className="p-2 border border-black"
        style={{
          backgroundColor: getColor("closeButton"),
          color: getColor("textOfCloseButton"),
        }}
        onClick={handleDelete}
      >
        <CloseIcon sx={{ fontSize: 20, fontWeight: "bold" }} /> حذف
      </button>
    </div>
  );
}

export default UserPrivateContainer;
