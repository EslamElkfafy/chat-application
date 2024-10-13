import {
    useDisclosure,
} from "@chakra-ui/react";

  import { useEffect, useState } from "react";

  import axios from "axios";

import UserOnlineContainer from "./UserOnlineContainer";
import UserModal from "./UserModal";
  
  function UserOnlineModule({user_Data} : {user_Data: any}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userData, setUserData] = useState<Record<string, any>>({})

    useEffect(() => {
      const fetchData = async () => {
        const response2 = await axios.get(`users/find/${user_Data._id}`);
        setUserData(response2.data)
      }
        fetchData()
    }, [user_Data._id])
    return (
      
      <>
        <UserOnlineContainer onClick={onOpen} user={userData} />
  
        <UserModal isOpen={isOpen} onClose={onClose} userId={user_Data._id}/>
      </>
    );
  }
  
  export default UserOnlineModule;
  