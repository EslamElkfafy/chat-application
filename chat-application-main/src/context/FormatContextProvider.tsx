import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useOptionContext } from "./OptionContextProvider";

const FormatContext = createContext<{
    abbreviations: Record<string, string>;
    filters: string[];
    emojis: Record<string, string>;
}>({
    abbreviations: {},
    filters: [],
    emojis: {},
});

function FormatContextProvider({ children }: { children: React.ReactNode }) {
  const [abbreviations, setAbbreviations] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<string[]>([]);
  const [emojis, setEmojis] = useState<Record<string, string>>({});
  const {option} = useOptionContext()

  useEffect(() => {
    const fetchData = async () => {
        try {
            setAbbreviations(await (await fetch(import.meta.env.VITE_API_BASE_URL + "api/readjsonfile/abbreviations")).json())
            setFilters(await (await fetch(import.meta.env.VITE_API_BASE_URL + "api/readjsonfile/filter")).json())
            setEmojis(await (await fetch(import.meta.env.VITE_API_BASE_URL + "api/readjsonfile/emojis")).json())
        } catch(e) {
            toast.error("حدث خطأ في السيرفر لم يتم تحميل ملفات التنسيق", option.toastOptions)
            console.error(e)
        }
    }
    fetchData()
  }, [])
  return (
    <FormatContext.Provider value={{ abbreviations, filters, emojis }}>
      {children}
    </FormatContext.Provider>
  );
}

export default FormatContextProvider;


export const useFormatContext = () => {
    return useContext(FormatContext);
}