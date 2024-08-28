import { Outlet, Navigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"


const AdminRoute = () => {
    const user = useSelector(state => state.auth)
    console.log(user)
    const { userInfo } = user

    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace />
}

export default AdminRoute