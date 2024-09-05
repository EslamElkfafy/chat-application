import {
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Abbreviations = () => {
  const abbreviationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [render, setRender] = useState(false);
  const [abbreviations, setAbbreviations] = useState({});
  useEffect(() => {
    (async () => {
      const response = await axios.get("abbreviations/get");
      setAbbreviations(response.data);
    })();
  }, [render]);
  const handleClick = async () => {
    await axios.post("abbreviations/add", {
      abbreviation: abbreviationRef.current?.value,
      description: descriptionRef.current?.value,
    });
    setRender((prev) => !prev);
  };
  const handleDelete = async (key : string) => {
    try {
      await axios.delete(`abbreviations/${key}`);
      setRender((prev) =>!prev);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <Input size={"sm"} placeholder="الاختصار" ref={abbreviationRef} />
      <Input size={"sm"} placeholder="الزخرفه" ref={descriptionRef} />
      <Button
        bg={"#46994b"}
        color={"white"}
        _hover={{}}
        size={"sm"}
        onClick={handleClick}
      >
        <div className="flex items-center ">اضافه</div>
      </Button>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
              <Th color={"white"} border={"1px solid gray"}>
                الاختصار
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الزخرفه
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                حذف
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(abbreviations).map(([key, value]: [any, any]) => {
              return (
                <Tr className="bg-green-50">
                  <Td border={"1px solid gray"}>{key}</Td>
                  <Td border={"1px solid gray"}>
                    {value}
                  </Td>
                  <Td border={"1px solid gray"}>
                    <Button
                      bg={"rgb(239 68 68)"}
                      color={"white"}
                      _hover={{}}
                      size={"sm"}
                      onClick={() => handleDelete(key)}
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
};

export default Abbreviations;
