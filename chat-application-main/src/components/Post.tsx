import Buttons from "./_elements/Buttons";

function Post() {
  return (
    <div className="flex  gap-x-2 border px-1 py-1 h-[150px] ">
      <img src="/avatar.jpg" className="w-10 h-10 border border-gray-800" />
      <div className="flex flex-col w-full">
        <div className="flex px-2 items-center justify-between font-bold">
          <p>user</p>
          <p>د6</p>
        </div>
        <div className="flex items-center justify-between px-2  ">
          <img src="/1600w-qJptouniZ0A.webp" className="w-[150px] h-[100px]" />
          <div className="flex items-end justify-end h-full">
            <Buttons/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
