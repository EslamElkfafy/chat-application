import AuthHeader from "../components/AuthHeader";
import Authorization from "../components/Authorization";
import OnlineSection from "../components/OnlineSection";

function AuthPage() {
  return (
    <div className="flex justify-center  items-center h-screen w-full bg-gray-500 p-1">
      <div className="h-screen w-[400px] flex flex-col border bg-gray-50">
        <AuthHeader />
        <Authorization/>
        <OnlineSection/>
      </div>
    </div>
  );
}

export default AuthPage;
