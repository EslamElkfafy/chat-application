import { useContext, createContext, useState } from "react";

const UserContext = createContext<{
  user: any;
  setUser: (user : any) => void;
}>({
  user: {},
  setUser: () => {},
});

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;


export const useUserContext = () => {
    return useContext(UserContext);
}