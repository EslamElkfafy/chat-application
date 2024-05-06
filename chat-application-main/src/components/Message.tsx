


function Message({item} : {item : any}) {
  return (
    <div  className="flex justify-between items-center w-full px-1" style={{borderBottom: "1px solid #bbaeae"}}>
      <div className="flex items-center gap-x-2">
        <img src={item.img} className="w-11 h-11"/>
        <div className="flex flex-col  py-2">
            <p className={"font-bold"} style={{color: item.nameColor, backgroundColor: item.backgroundColor, textAlign:"center", width: "fit-content", padding: "0px 10px"}}>{item.name}</p>
            <p style={{color: item.fontColor}}>{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
