import React, { ReactElement } from "react";
import { useFormatContext } from "../context/FormatContextProvider";


export default function FormatText({text}: {text: string})  {
  const wordsList = text.split(" ");
  const {abbreviations, filters, emojis} = useFormatContext()
  const formattedText: React.ReactNode[] =
    wordsList.map((word) => {
      let formattedWord: ReactElement | string = word;
      const dataAbbreviations: Record<string, string> = abbreviations;
      const dataFilter: string[] = filters;
      const dataEmoji: Record<string, string> = emojis;
      if (dataFilter.includes(word)) {
        formattedWord = "*".repeat(formattedWord.length);
      }
      if (word in dataAbbreviations) {
        formattedWord = dataAbbreviations[word];
      }
      if (word in dataEmoji) {
        formattedWord = (
          <img
            src={import.meta.env.VITE_API_BASE_URL + dataEmoji[word]}
            alt=""
            className="h-5 inline-block"
          />
        );
      }
      return formattedWord;
    })
  ;
  return (
    <React.Fragment>
      {formattedText.reduce((prev, curr, index) => [
        prev,
        <React.Fragment key={`space-${index}`}> </React.Fragment>,
        <React.Fragment key={`element-${index}`}>{curr}</React.Fragment>,
      ])}
    </React.Fragment>
  );
};
