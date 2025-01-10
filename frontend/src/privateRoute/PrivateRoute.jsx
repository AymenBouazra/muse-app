/* eslint-disable react/prop-types */
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (token !== null) {
        const decoded = jwtDecode(token)

        const expired = Math.floor(new Date().getTime() / 1000) >= decoded.exp
        if (expired) {
            toast.error('Your session has expired try relogin!')
            return <Navigate to='/auth' replace />
        } else {
            return children;
        }
    } else {
        localStorage.removeItem("token")
        return <Navigate to='/auth' replace />
    }
}
export default PrivateRoute