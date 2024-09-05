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

const Messages = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const [message, setMessage] = useState("")
  const handleClick = async (type: any) => {
    if (!titleRef.current?.value || !descriptionRef.current?.value) {
      setTimeout(() => {
        setMessage("");
      }, 5000)
      setMessage("الحقول الضامنة مطلوبة");
      return;
    } 
    const message = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      type: type,
      ...(type === "daily" ? { date: Date.now() } : {}),
    };
    await axios.post("welcomedailymessages/addmessage", { message });
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    setRender(prev => !prev);
  };
  useEffect(() => {
    (async () => {
      const response = await axios.get("welcomedailymessages/getmessages");
      setMessages(response.data);
    })();
  }, [render]);
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <Input size={"sm"} placeholder="عنوان الرساله" ref={titleRef} />
      <Textarea size={"sm"} placeholder="الرساله" ref={descriptionRef} />
      <Button
        bg={"#46994b"}
        color={"white"}
        _hover={{}}
        size={"sm"}
        onClick={() => handleClick("welcome")}
      >
        <div className="flex items-center ">اضافه الي رسائل الترحيب</div>
      </Button>
      <Button
        bg={"#dc5038"}
        color={"white"}
        _hover={{}}
        size={"sm"}
        onClick={() => handleClick("daily")}
      >
        <div className="flex items-center ">اضافه الي الرسائل اليوميه</div>
      </Button>
      {message}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
              <Th color={"white"} border={"1px solid gray"}>
                التصنيف
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                العنوان
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الرساله
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                حذف
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {messages.map((message: any) => (
              <Tr key={message.id}>
                <Td border={"1px solid gray"}>
                  {message.type === "welcome" ? "ترحيب" : "يومي"}
                </Td>
                <Td border={"1px solid gray"}>{message.title}</Td>
                <Td
                  border={"1px solid gray"}
                  className="max-w-[200px] text-wrap"
                >
                  {message.description}
                </Td>
                <Td border={"1px solid gray"}>
                  <Button
                    bg={"rgb(239 68 68)"}
                    color={"white"}
                    _hover={{}}
                    size={"sm"}
                    onClick={async () => {
                      await axios.delete(`welcomedailymessages/deletemessage/${message.id}`);
                      setRender(prev =>!prev);
                    }}
                  >
                    <X />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <FilterModule/> */}
    </div>
  );
};

export default Messages;
