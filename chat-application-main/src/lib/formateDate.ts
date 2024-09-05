export const formateDate = (value: number) => {
  const dateObj = new Date(value);

  // Extract the date components
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  // Format the date as desired
  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
