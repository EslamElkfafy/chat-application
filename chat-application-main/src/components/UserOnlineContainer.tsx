import { useEffect, useState } from "react";
import Flags from "react-country-flag";

function UserOnlineContainer({ onClick, user }: { onClick?: () => void, user: any }) {
  
  return (
    
    <div
      className="flex justify-between items-center px-2 border cursor-pointer "
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <div className="flex items-center gap-x-1">
        <img src={user.img} className="w-9 h-9" style={{borderLeft: user.status === "connect" ? ((user.chatBlock === true || user.infoBlock === true) ? "4px solid red" : "4px solid green") :  "4px solid yellow"}}/>
        <div className="flex flex-col justify-between py-2">
          <p style={{color: user.nameColor, backgroundColor: user.backgroundColor}}>{user.name}</p>
          <p style={{color: user.fontColor}}>{user.state}</p>
        </div>
      </div>
      <Flags countryCode="sa" svg />
    </div>
  );
}

export default UserOnlineContainer;
