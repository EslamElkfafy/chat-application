import { createContext, useContext, useEffect, useState } from "react";

const SizeContext = createContext<{
  size: number;
  setSize: (size: number) => void;
}>({
  size: 1,
  setSize: () => {},
});

const SizeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState(1);

  useEffect(() => {
    if (!window.localStorage.getItem("size")) {
      window.localStorage.setItem("size", "1");
      setSize(1);
    }
    const size = parseFloat(window.localStorage.getItem("size") as string);
    setSize(size);
  }, []);
  return (
    <SizeContext.Provider value={{ size, setSize }}>
      {children}
    </SizeContext.Provider>
  );
};

export default SizeContextProvider;

export const useSizeContext = () => {
  return useContext(SizeContext);
};
