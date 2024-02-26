import { PATH } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/services/auth-service';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { token } = useAppSelector(authSelector);

    if (token === null && !localStorage.getItem('token')) return <Navigate to={PATH.AUTH} />;
    return <Outlet />;
};
