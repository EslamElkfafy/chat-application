import AdminSideBar from "../components/AdminSideBar"

function AdminLayout({children} : {children: React.ReactNode}) {
  return (
    <div className="flex">
      <AdminSideBar/>
      {children}
    </div>
  )
}

export default AdminLayout
