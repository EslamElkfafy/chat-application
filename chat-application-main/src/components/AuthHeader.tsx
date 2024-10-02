import { getColor } from "../lib/getColor";


function AuthHeader() {
  return (
    <div className={`flex `} style={{ backgroundColor: getColor("backgroundItems")}}>
      <div className={`flex w-[56%] items-center `} style={{ backgroundColor: getColor("mainColor")}}>
        <img src="/1600w-qJptouniZ0A.webp" alt="logo" className="w-6 h-6" />
        <p className=" text-xl text-center flex-1" style={{color: getColor("textOfMainColor")}}>شات صقر الكتابي</p>
      </div>
    </div>
  );
}

export default AuthHeader;
