import { useNavigate } from "react-router-dom"

function SignNikeName() {
  const router = useNavigate();
  const handler = () => {
    router('/roomId')
  }
  return (
    <div className="flex items-center">
      <input type="text" placeholder="أكتب الاسم المستعار"/>
      <button  className="w-6 bg-blue-800 text-white px-1 py-2" onClick={handler}>
        الدخول
      </button>
    </div>
  )
}

export default SignNikeName
