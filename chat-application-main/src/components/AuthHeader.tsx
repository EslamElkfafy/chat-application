import { RefreshCcw } from 'lucide-react';

function AuthHeader() {
 
  return (
    <div className="flex justify-between items-center px-3  bg-blue-900 py-2">
      <div className="flex gap-x-1 items-center ">
        <img src="/1600w-qJptouniZ0A.webp" alt="logo" className="w-6 h-6"/>
        <p className='text-white text-xl'>[Name]</p>
      </div>
      <div className='w-8 h-8 bg-green-600 flex items-center justify-center cursor-pointer'>
        <RefreshCcw className='font-bold text-white'/>
      </div>
    </div>
  )
}

export default AuthHeader
