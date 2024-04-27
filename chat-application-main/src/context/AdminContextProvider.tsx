import { useContext, createContext, useState } from "react";

const AdminContext = createContext<{
  admin: boolean;
  setAdmin: (admin: boolean) => void;
}>({
  admin: false,
  setAdmin: () => {},
});

function AdminContextProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState(false);
  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;


export const useAdminContext = () => {
    return useContext(AdminContext);
}