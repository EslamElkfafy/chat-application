import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useUserContext } from '../context/UserContextProvider';
import { useOptionContext } from '../context/OptionContextProvider';
import axios from 'axios';
import { getColor } from '../lib/getColor';
import { useSocketContext } from '../context/SocketContextProvider';

const ContainImg = styled.div`
    max-width: 60px;
    /* height: ; */
    padding: 5px;
    border-radius: .5rem;
    border: 1px solid black;
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
export const ContainImgOfMic = ({index, item, setListOfVoices,listOfVoices} : {index: any, item: any, setListOfVoices: any, listOfVoices: any}) => {
    const { user } = useUserContext()
    const { option, setOption } = useOptionContext()
    const {socket} = useSocketContext()
    const [data, setdata ] = useState<Record<string, any>>({})
    const handelClick = async (index: any) => {
        let tempList = [...listOfVoices]
        if (!tempList[index] || index === listOfVoices.indexOf(user._id))
        {
            if (listOfVoices.includes(user._id)){
                if (index === listOfVoices.indexOf(user._id)) {
                    tempList[index] = ""
                    setOption.setMic(false)
                } else {
                    tempList[listOfVoices.indexOf(user._id)] = ""
                    tempList[index] = user._id
                }
            }else {
                tempList[index] = user._id
                setOption.setMic(true)
            }
            await axios.put(`rooms/${option.room._id}`, {placesOfVoices: tempList})
            setListOfVoices(tempList)
            socket.emit("changeListOfVoices", option.room._id)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`users/find/${item}`)
            setdata(response.data)
        }
        if (item !== ""){
            fetchData()
        }
           
    }, [listOfVoices])
  return (
        <ContainImg key={index} onClick={() => handelClick(index)} style={{backgroundColor: getColor("micBackground")}}>
            <Img src={import.meta.env.VITE_API_BASE_URL + (item === "" ? "uploads/mic.png" : data.img)} />
        </ContainImg>
  )
}
