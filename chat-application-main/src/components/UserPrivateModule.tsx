import UserModal from "./UserModal";
import UserPrivateContainer from "./UserPrivateContainer";

function UserPrivateModule({ userId }: { userId: any }) {
  return (
    <>
      <UserPrivateContainer userId={userId} />

      {/* <UserPrivateModule userId={userId} /> */}
    </>
  );
}

export default UserPrivateModule;
