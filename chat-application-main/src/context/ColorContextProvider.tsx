import axios from "axios";
import { useContext, createContext, useEffect, useState, useMemo } from "react";

interface Color {
  color: string;
  arabic: string;
}

interface ColorPaletteContextType {
  colorPalette: Record<string, Color>;
  setColorPalette: (colors: Record<string, Color>) => void;
}

const colorPaletteContext = createContext<ColorPaletteContextType>({
  colorPalette: {},
  setColorPalette: () => {},
});

const ColorPaletteContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorData, setColorData] = useState<Record<string, Color>>({});

  const fetchColorPalette = async () => {
    try {
      const response = await axios.get("/colorpalette");
      setColorData(response.data);
    } catch (error) {
      console.error("Error fetching color palette:", error);
      setColorData({});
    }
  };

  useEffect(() => {
    fetchColorPalette();
  }, []);

  const value = useMemo(() => ({
    colorPalette: colorData || {},
    setColorPalette: setColorData,
  }), [colorData]);

  return (
    <colorPaletteContext.Provider value={value}>
      {children}
    </colorPaletteContext.Provider>
  );
};

export const useColorPaletteContext = () => {
  return useContext(colorPaletteContext);
};

export default ColorPaletteContextProvider;
