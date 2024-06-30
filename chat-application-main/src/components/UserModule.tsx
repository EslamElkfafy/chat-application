import {
  useDisclosure,
} from "@chakra-ui/react";
import UserContainer from "./UserContainer";
import UserModal from "./UserModal";

function UserModule({userId} : {userId: any}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    
    <>
      <UserContainer onClick={onOpen} userId={userId} />

      <UserModal isOpen={isOpen} onClose={onClose} userId={userId} />
    </>
  );
}

export default UserModule;
