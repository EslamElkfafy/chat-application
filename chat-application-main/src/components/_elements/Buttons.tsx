import { Heart } from "lucide-react";
import CommentModule from "../CommentModule";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';

function Buttons({item} : {item : any}) {
  const { user } = useUserContext()
  const [resultLike, setResultLike] = useState(item.like.includes(user._id));
  const [lengthOfLike, setLengthOfLike] = useState(0)
  const handleLikeClick = async () => {
    await axios.put(`posts/updatelike/${item._id}`, {check : resultLike, checkId: user._id});
    setResultLike(!resultLike)
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`posts/getpost/${item._id}`);
      setLengthOfLike(response.data.like.length)
    }
    fetchData()
  }, [resultLike])
  return (
    <div className="flex items-center">
      <div className=" text-red-500  gap-x-1 text-sm p-1 flex items-center  bg-gray-100 cursor-pointer " onClick={handleLikeClick}>
        {resultLike ?  <FavoriteIcon style={{fontSize: 17}}  />:  <Heart className="size-4" />}
        {lengthOfLike}
      </div>
      <CommentModule item= {item}/>
    </div>
  );
}

export default Buttons;
