import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute() {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/songs" replace /> : <Outlet />;
}

export default AuthRoute;
