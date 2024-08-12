import { Outlet } from "react-router-dom"
import AdminSideBar from "../components/AdminSideBar"

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSideBar/>
      <Outlet />
    </div>
  )
}

export default AdminLayout
