import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
} from "@chakra-ui/react";
import FilterModule from "../../components/FilterModule";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Filter() {
  const inputWord = useRef<HTMLInputElement>(null);
  const [render, setRender] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("filters/get");
      setData(response.data);
    })();
  }, [render]);
  const handleAllow = async (word?: string) => {
    if (!word) return;

    try {
      await axios.delete(`filters/${word}`);
      inputWord.current!.value = "";
      setRender((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete the word:", error);
    }
  };
  const handleBanned = async () => {
    if (!inputWord.current?.value) return;
    await axios.post("filters/add", { word: inputWord.current?.value });
    inputWord.current.value = "";
    setRender((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <Input size={"sm"} placeholder="اضافه كلمه" ref={inputWord} />
      <Button
        bg={"#46994b"}
        color={"white"}
        _hover={{}}
        size={"sm"}
        onClick={() => handleAllow(inputWord.current?.value)}
      >
        <div className="flex items-center ">اضافه الي الكلمات المسموحه</div>
      </Button>
      <Button
        bg={"#dc5038"}
        color={"white"}
        _hover={{}}
        size={"sm"}
        onClick={handleBanned}
      >
        <div className="flex items-center ">اضافه الي الكلمات الممنوعه</div>
      </Button>
      {/* <Button
              bg={"#2eadd7"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه الي الكلمات المراقبه
              </div>
            </Button> */}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
              <Th color={"white"} border={"1px solid gray"}>
                التصنيف
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الكلمة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                حذف
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((word) => {
              return (
                <Tr className="bg-green-50">
                  <Td border={"1px solid gray"}>ممنوعه</Td>
                  <Td border={"1px solid gray"}>{word}</Td>
                  <Td border={"1px solid gray"}>
                    <Button
                      bg={"rgb(239 68 68)"}
                      color={"white"}
                      _hover={{}}
                      size={"sm"}
                      onClick={() => handleAllow(word)}
                    >
                      <X />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <FilterModule/> */}
    </div>
  );
}

export default Filter;
