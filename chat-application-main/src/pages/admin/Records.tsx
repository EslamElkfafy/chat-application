import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function Records() {
  const [data, setData] = useState<any>([]);
  const [inputSearch, setInputSearch] = useState<any>("");
  useEffect(() => {
    (async () => {
      const response = await axios.get("records/getall");
      setData(response.data.reverse());
    })();
  }, []);

  return (
    <div className="flex flex-col gap-y-3 p-2">
      <Input size={"sm"} placeholder="البحث..." value={inputSearch} onChange={e => setInputSearch(e.target.value)} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
            <Th color={"white"} border={"1px solid gray"}>
                الحاله
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                العضو
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الزخروفه
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                أي بي
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الدولة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الجهاز
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.filter((item: any) => item.name.includes(inputSearch)).map((item : any, index: any) => (
                <Tr key={index}>
                  <Td>{item.role}</Td>
                  <Td>{item.userName}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.ip}</Td>
                  <Td>{item.country}</Td>
                  <Td>{item.device}</Td>
                </Tr>
              ))
            }
            <Tr className="bg-green-50">
            
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Records;
