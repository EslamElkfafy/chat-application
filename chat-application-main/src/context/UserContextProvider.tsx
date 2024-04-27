import { useContext, createContext, useState } from "react";

const UserContext = createContext<{
  user: any;
  setUser: (user : any) => void;
}>({
  user: {},
  setUser: () => {},
});

function UserContextProvider({ children }: { children: React.ReactNode }) {
  let current_user : any  = window.localStorage.getItem("user")
  if (current_user)
  {
    current_user = JSON.parse(current_user)
  } else {
    current_user = null
  }
  const [user, setUser] = useState(current_user);
  let setUserWithLocal = (user : any)  => {
    window.localStorage.setItem("user", JSON.stringify(user));
    setUser(user)
  }
  return (
    <UserContext.Provider value={{ user, setUser : setUserWithLocal }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;


export const useUserContext = () => {
    return useContext(UserContext);
}