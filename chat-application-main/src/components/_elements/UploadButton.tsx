function UploadButton() {
  return (
    <label
      htmlFor="uploadFile1"
      className="bg-gray-50  border border-gray-700 rounded-md text-sm  py-1.5 outline-none w-full   cursor-pointer mx-auto block font-[sans-serif]"
    >
      <div className="px-1 flex items-center  w-full">
      <img src="/avatar.jpg" className="w-5 h-5"/>
      <p className="text-center w-full font-bold text-gray-500">        تغير الصوره</p>
      </div>
      <input type="file" id="uploadFile1" className="hidden" />
    </label>
  );
}

export default UploadButton;
