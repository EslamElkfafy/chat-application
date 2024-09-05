import { Button, Checkbox, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Browzer, System } from "../../lib/utils";
import { Save } from "lucide-react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { formateDate } from "../../lib/formateDate";

function Block() {
  const [searchName, setSearchName] = useState(""); 
  const [users, setUsers] = useState([]);
  const activeSearchNameRef = useRef(false);
  const [checked, setChecked] = useState(1);
  const idSelected = useRef<any>();
  const daysRef = useRef<HTMLInputElement>(null);
  const [render, setRender] = useState<boolean>(false);
  const [message, setMessage] = useState("")
  useEffect(() => {
    (async () => {
      const response = await axios.get(`users/findall`);
      setUsers(response.data);
    })();
  }, [render])
  const handleCheckboxChange = (index: any) => {
    setChecked(index);
  };
  const handleSubmit = async() => {
    setTimeout(() => {
      setMessage("");
    }, 5000)
    if (!idSelected.current) {
      setMessage("يجب اختيار عضو");
      return;
    }
    const days = daysRef.current ? parseInt(daysRef.current.value) : 0;
    
    if (checked === 2 && (!days || days <= 0)) {
      setMessage("يجب ادخال عدد أيام الحظر");
      return;
    }
    try {
      await axios.put(`users/${idSelected.current}`, { banned: {bannedUntil: checked === 2 ? Date.now() + (+daysRef.current!.value * 1000 * 60 * 60 * 24) : null} });
      setMessage("تم حظر العضو");
    idSelected.current = null;
    setSearchName("");
    setRender(prev => !prev);
    daysRef.current!.value = "";
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
        <div className="relative">
          <Input size={"sm"} placeholder="اسم العضو" value={searchName} onChange={e => {
            activeSearchNameRef.current = true;
            setSearchName(e.target.value)}}  />
          <ul className="absolute top-[%100] left-0 right-0 bg-white z-10">
            {
              (activeSearchNameRef.current && searchName) && users.filter((user: any) => user.name.includes(searchName)).slice(0, 5).map((user : any) => (
                <li key={user._id} className="border-[1px] p-1 flex gap-2 items-center" onClick={() => {
                  idSelected.current = user._id;
                  activeSearchNameRef.current = false;
                  setSearchName(user.name);
                }}>
                  <img className="w-8" src={import.meta.env.VITE_API_BASE_URL + user.img} alt="" />
                  <div><p>{user.name}</p><p>{user.state}</p></div>
                </li>
              ))
            }
          </ul>
        </div>
      <label>
        <input
          type="checkbox"
          checked={checked === 1}
          onChange={() => handleCheckboxChange(1)}
        />
        دائم
      </label>
      <label>
        <input
          type="checkbox"
          checked={checked === 2}
          onChange={() => handleCheckboxChange(2)}
        />
        مده(ايام)
      </label>
      {checked === 2 && <Input size={"sm"} ref={daysRef}/>}
      <Button
              bg={"#46994b"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              onClick={handleSubmit}
            >
              <div className="flex items-center ">
                اضافه
              </div>
            </Button>
            {message}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
            <Th color={"white"} border={"1px solid gray"}>
                العضو
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الحظر
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                ينتهي في
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              users.filter((user: any) => user.banned).map((user: any) => (
                <Tr className="bg-green-50">
                <Td border={"1px solid gray"}>{user.name}</Td>
                <Td border={"1px solid gray"}>{user.banned.bannedUntil ? "مؤقت" : "دائم"}</Td>
                <Td border={"1px solid gray"} className="flex items-center justify-center">{user.banned.bannedUntil ? formateDate(user.banned.bannedUntil) : "🚫"}</Td>

              </Tr>
              ))
            }
            {/* <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>مراقبه</Td>
              <Td border={"1px solid gray"}>شان</Td>
              <Td border={"1px solid gray"}><Button
              bg={"rgb(239 68 68)"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <X />
            </Button></Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <FilterModule/> */}
    </div>
  );
}

export default Block;
