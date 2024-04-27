import { Link } from "react-router-dom";
import { ADMIN_SIDEBAR } from "../lib/utils";

function AdminSideBar() {
  return (
    <div className="flex flex-col gap-y-5 border-[2px] rounded px-2 py-4 w-[150px]">
      {ADMIN_SIDEBAR.map((item) => (
        <Link
          to={item.link}
          className="text-blue-500 py-1 cursor-pointer hover:bg-blue-500 hover:text-white px-2 rounded-md font-semibold"
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
}

export default AdminSideBar;
