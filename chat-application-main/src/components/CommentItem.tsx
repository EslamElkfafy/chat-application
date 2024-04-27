function CommentItem() {
  return (
    <div className="flex items-center justify-between border">
      <div className="flex items-center gap-x-1">
        <img src="/avatar.jpg" className="w-9 h-9" />
        <div className="flex flex-col justify-between">
            <p className="font-semibold">خالد</p>
            <p className="font-semibold">hi there</p>
        </div>
      </div>
      <p className="font-semibold">6د</p>
    </div>
  );
}

export default CommentItem;
