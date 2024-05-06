import { useEffect } from "react";
import AuthHeader from "../components/AuthHeader";
import Authorization from "../components/Authorization";
import OnlineSection from "../components/OnlineSection";
import { useUserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";


function AuthPage({setListOfMessage} : {setListOfMessage :any}) {
  const { setUser } = useUserContext()
  const router = useNavigate()
  useEffect(() => {

    const interval = setInterval(() => {
      let user: any = window.localStorage.getItem("user")
      if (user)
        {
          user = JSON.parse(user)
          setUser(user)
        console.log(user)
        router("/rommId")
      }

    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex justify-center  items-center h-screen w-full bg-gray-500 p-1">
      <div className="h-screen w-[400px] flex flex-col border bg-gray-50">
        <AuthHeader />
        <Authorization setListOfMessage={setListOfMessage}/>
        <OnlineSection/>
      </div>
    </div>
  );
}

export default AuthPage;
