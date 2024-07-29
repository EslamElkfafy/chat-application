import CommentModule from "../CommentModule";

function Buttons({item} : {item : any}) {

  return (
    <div className="flex items-center">
      <CommentModule item= {item}/>
    </div>
  );
}

export default Buttons;
