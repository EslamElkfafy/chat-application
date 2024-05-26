import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ShapeAlert = ({message, fromUserId} : {message : any, fromUserId : any}) => {
    const [dataUser, setDataUser] = useState<Record<string, any>>({})
    useEffect (() => {
        const fetchData = async () => {
            const response = await axios.get(`users/find/${fromUserId}`);
            setDataUser(response.data)
        }
        fetchData()
    }, [])
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", rowGap: "5px"}}>
        <div style={{borderRadius:"5px", maxWidth: "fit-content", padding: "5px 10px", backgroundColor: "#1e40af", color: 'white'}}>تنبيه</div>
        <div style={{width: "100%", display: "flex", flexDirection: "column", rowGap: "5px"}}>
            <div style={{display: "flex", columnGap: "5px", alignItems: "center"}}>
                <img style={{width: "30px", height: "30px"}} src={import.meta.env.VITE_API_BASE_URL + dataUser.img} alt="" />
                <span style={{color: dataUser.nameColor, backgroundColor: dataUser.backgroundColor}}>{dataUser.name}</span>
            </div>
            <div style={{display: "flex", color: dataUser.fontColor}}>{message}</div>
        </div>
    </div>
  )
}

export default ShapeAlert