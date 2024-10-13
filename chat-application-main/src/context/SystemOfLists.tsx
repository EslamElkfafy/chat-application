import React, { createContext, useContext, useState } from "react";

interface SystemOfListsContextProps {
  roomInfoIsOpen: boolean;
  setRoomInfoIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roomsIsOpen: boolean;
  setRoomsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileIsOpen: boolean;
  setProfileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  privateChatIsOpen: boolean;
  setPrivateChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  blogsIsOpen: boolean;
  setBlogsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetLists: () => void;
}

const SystemOfListsContext = createContext<SystemOfListsContextProps | undefined>(undefined);

export const SystemOfListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomInfoIsOpen, setRoomInfoIsOpen] = useState(true);
  const [roomsIsOpen, setRoomsIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [privateChatIsOpen, setPrivateChatIsOpen] = useState(false);
  const [blogsIsOpen, setBlogsIsOpen] = useState(false);

  const resetLists = () => {
    setRoomInfoIsOpen(false);
    setRoomsIsOpen(false);
    setProfileIsOpen(false);
    setPrivateChatIsOpen(false);
    setBlogsIsOpen(false);
  };

  return (
    <SystemOfListsContext.Provider value={{
      roomInfoIsOpen,
      setRoomInfoIsOpen,
      roomsIsOpen,
      setRoomsIsOpen,
      profileIsOpen,
      setProfileIsOpen,
      privateChatIsOpen,
      setPrivateChatIsOpen,
      blogsIsOpen,
      setBlogsIsOpen,
      resetLists
    }}>
      {children}
    </SystemOfListsContext.Provider>
  );
};

export const useSystemOfLists = () => {
  const context = useContext(SystemOfListsContext);
  if (!context) {
    throw new Error("useSystemOfLists must be used within a SystemOfListsProvider");
  }
  return context;
};
