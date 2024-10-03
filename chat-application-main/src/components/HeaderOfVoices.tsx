import React, { useState } from 'react'
import styled from 'styled-components';
import { useUserContext } from '../context/UserContextProvider';
import { useOptionContext } from '../context/OptionContextProvider';
import { ContainImgOfMic } from './ContainImgOfMic';
import { getColor } from '../lib/getColor';

const Container = styled.div`
    padding: 5px;
    width: 100%;
    display: flex;
    column-gap: 10px;
    height: 80px;
    align-items: center;
`;
// const ContainImgOfMic = styled.div.attrs<{index: number}>(props => ({
//     'data-index': props.index,
//   }))<{ index: number }>`
//     width: 60px;
//     height: 60px;
//     padding: 5px;
//     background-color: #01ffef33;
//     border-radius: .5rem;
// `;
const ContainImgOfVolume = styled.div`
    max-width: 60px;
    /* height: 60px; */
    padding: 5px;
    border-radius: .5rem;
    border: 1px solid black;
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
export const HeaderOfVoices = ({listOfVoices,setListOfVoices}: {listOfVoices: any, setListOfVoices: any}) => {
    const { user } = useUserContext()
    const { option, setOption } = useOptionContext()
    const [ toggleVolume, setToggleVolume ] = useState(option.voice)
    // const handelClick = (index: any) => {
    //     setListOfVoices((previous : any)  => {
    //         let tempList = [...previous]
    //         if (listOfVoices.includes(user._id)){
    //             if (index === listOfVoices.indexOf(user._id)) {
    //                 tempList[index] = ""
    //             }else {
    //                 tempList[listOfVoices.indexOf(user._id)] = ""
    //                 tempList[index] = user._id
    //             }
    //         }else {
    //             console.log(user._id)
    //             tempList[index] = user._id
    //         }
    //         return tempList
    //     })
    // }
    const handleClick = () => {
        setOption.setVoice(!toggleVolume)
        setToggleVolume(!toggleVolume)
    }
  return (
    <Container style={{backgroundColor: getColor("mainColor")}}>
        <ContainImgOfVolume onClick={handleClick} style={{backgroundColor: toggleVolume ?  getColor("voiceBackground") : getColor("micBackground")}}>
            <Img src={import.meta.env.VITE_API_BASE_URL + "uploads/voice.png"}/>
        </ContainImgOfVolume>

        {
            listOfVoices.map((item : any, index: number) => {
                return (
                    <ContainImgOfMic key={index} index={index} item={item} listOfVoices={listOfVoices} setListOfVoices={setListOfVoices} />
                )
                // return <ContainImgOfMic key={index} index= {index} onClick={() => handelClick(index)}>
                //     <Img src={import.meta.env.VITE_API_BASE_URL + (item === "" ? "uploads/microphone-black-shape.png" : item)} />
                // </ContainImgOfMic>
            })
        }
    </Container>
  )
}
