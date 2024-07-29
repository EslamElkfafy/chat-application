import { useState } from "react";
import AuthHeader from "../components/AuthHeader";
import Authorization from "../components/Authorization";
import OnlineSection from "../components/OnlineSection";


function AuthPage() {
  const [errorMessage, setErrorMessage] = useState("")
  return (
    <div className="flex justify-center  items-center h-screen w-full bg-gray-500 p-1">
      <div className="h-screen w-[400px] flex flex-col border bg-gray-50">
        <AuthHeader />
        <Authorization setErrorMessage={setErrorMessage}/>
        <OnlineSection errorMessage={errorMessage}/>  
      </div>
    </div>
  );
}

export default AuthPage;
