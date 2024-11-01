import { Outlet } from "react-router-dom"
const AuthLayout = () => {

  return (
    <div className="container mx-auto px-4 py-5">
      <Outlet />
    </div>
  )
}

export default AuthLayout
