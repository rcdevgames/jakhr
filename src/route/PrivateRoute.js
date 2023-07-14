import { Outlet, Navigate } from 'react-router-dom'
import { getToken } from '../utils/session';

const PrivateRoutes = () => {
    let auth = {'token': false}
    const token = getToken();
    return(
        token !=null ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;