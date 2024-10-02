import Flags from "react-country-flag";

function UserOnlineContainer({ onClick, user }: { onClick?: () => void, user: any }) {
  const imgStyle = {
    borderLeft: user.status === "connect" ? 
    (user.chatBlock === true || user.infoBlock === true) ? 
    "4px solid red" : 
    "4px solid green":  
    "4px solid yellow"
  }
  return (
    
    <div
      className="flex justify-between items-center border cursor-pointer bg-[#fafafa]"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <div className="flex items-center gap-x-1">
        <img src={import.meta.env.VITE_API_BASE_URL + user.img} className="w-14 min-h-12 max-h-16 object-cover" style={imgStyle}/>
        <div className="flex flex-col justify-between">
          <p style={{color: user.nameColor, backgroundColor: user.backgroundColor}}>{user.name}</p>
          <p style={{color: "#888888"}}>{user.state}</p>
        </div>
      </div>
      <Flags countryCode={user.country} svg />
    </div>
  );
}

export default UserOnlineContainer;
