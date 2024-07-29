import {Dispatch, SetStateAction, createContext, useContext, useEffect, useState} from "react"
import { useSocketContext } from "./SocketContextProvider"
import { useUserContext } from "./UserContextProvider"

const ListOfMessageContext = createContext<{
    listOfMessage: any[],
    setListOfMessage: Dispatch<SetStateAction<[] | never[] | any>>
}>({
    listOfMessage: [],
    setListOfMessage: (previous: any) => ({})
})

const ListOfMessageContextProvider = ({children}: {children: React.ReactNode}) => {
    const [listOfMessage, setListOfMessage]:  [
        listOfMessage: any[],
        setListOfMessage: Dispatch<SetStateAction<[]>>
    ] = useState([])
    return (
        <ListOfMessageContext.Provider value={{
            listOfMessage,
            setListOfMessage
        }}>
            {children}
        </ListOfMessageContext.Provider>
    )
}

export default ListOfMessageContextProvider;

export const useListOfMessageContext = () => {
    return useContext(ListOfMessageContext)
}