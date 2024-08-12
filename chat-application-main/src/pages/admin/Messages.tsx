import { Button, Input, Table, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr } from '@chakra-ui/react'
import { X } from 'lucide-react'
import React from 'react'

const Messages = () => {
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <Input size={"sm"} placeholder="عنوان الرساله" />
      <Textarea size={"sm"} placeholder="الرساله" />
      <Button
              bg={"#46994b"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه الي رسائل الترحيب  
              </div>
            </Button>
            <Button
              bg={"#dc5038"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه الي الرسائل اليوميه
              </div>
            </Button>
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
            <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>الترحيب</Td>
              <Td border={"1px solid gray"}>فايده</Td>
              <Td border={"1px solid gray"} className='max-w-[200px] text-wrap'>زوارونا الكرام يرجي تسجيل ثقلقلثقل قثقهخلاثق قلهثقلهخثقا ثقهلاهخثقلاثقهخ</Td>
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
      {/* <FilterModule/> */}
    </div>
  )
}

export default Messages