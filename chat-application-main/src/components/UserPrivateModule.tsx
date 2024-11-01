import UserModal from "./UserModal";
import UserPrivateContainer from "./UserPrivateContainer";

function UserPrivateModule({ userId, message, resetLists, chatId }: { userId: any, message : any, resetLists: any, chatId: any}) {
  return (
    <>
      <UserPrivateContainer userId={userId} message={message} resetLists={resetLists} chatId={chatId}/>

    </>
  );
}

export default UserPrivateModule;
