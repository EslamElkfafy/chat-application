import UserModal from "./UserModal";
import UserPrivateContainer from "./UserPrivateContainer";

function UserPrivateModule({ userId, message }: { userId: any, message : any}) {
  return (
    <>
      <UserPrivateContainer userId={userId} message={message}/>

    </>
  );
}

export default UserPrivateModule;
