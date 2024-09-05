import axios from "axios";
import React, { ReactElement } from "react";

export const formatText = async (text: string) => {
  const wordsList = text.split(" ");
  const formattedText: React.ReactNode[] = await Promise.all(
    wordsList.map(async (word) => {
      let formattedWord: ReactElement | string = word;
      const dataAbbreviations: Record<string, string> = (
        await axios.get("readjsonfile/abbreviations")
      ).data;
      const dataFilter: string[] = (await axios.get("readjsonfile/filter"))
        .data;
      const dataEmoji: Record<string, string> = (
        await axios.get("readjsonfile/emojis")
      ).data;
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
  );
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
