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
import { X } from "lucide-react";
import React from 'react'

const Subscriptions = () => {
  return (
    <div className="flex flex-col gap-y-3 p-2">
    <Input size={"sm"} placeholder="البحث..." />
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr className="bg-blue-500 ">
          <Th color={"white"} border={"1px solid gray"}>
              الاشتراك
            </Th>
            <Th color={"white"} border={"1px solid gray"}>
              العضو
            </Th>
            <Th color={"white"} border={"1px solid gray"}>
              الزخروفه
            </Th>
            <Th color={"white"} border={"1px solid gray"}>
            المده
            </Th>
            <Th color={"white"} border={"1px solid gray"}>
              الايام المتبقيه
            </Th>
            <Th color={"white"} border={"1px solid gray"}>
              حذف
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr className="bg-green-50">
          <Td border={"1px solid gray"}>elhaj</Td>
            <Td border={"1px solid gray"}>elhaj</Td>
            <Td border={"1px solid gray"}>la chgar</Td>
            <Td border={"1px solid gray"}>دائم</Td>
            <Td border={"1px solid gray"}>
              0
            </Td>
            <Td border={"1px solid gray"}><Button
              bg={"rgb(239 68 68)"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <X />
            </Button></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </div>
  )
}

export default Subscriptions