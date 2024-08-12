import { Button, Input, Table, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr } from '@chakra-ui/react'
import { X } from 'lucide-react'
import React from 'react'

const Abbreviations = () => {
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <Input size={"sm"} placeholder="الاختصار" />
      <Input size={"sm"} placeholder="الزخرفه" />

      <Button
              bg={"#46994b"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه
              </div>
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
            <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>1س</Td>
              <Td border={"1px solid gray"}>السلام عليكم و رحمه الله و بركاته</Td>
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

export default Abbreviations