import { Navigate, Outlet } from 'react-router-dom';
import { authSelector } from '@redux/services/auth-service';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { PATH } from '@constants/index';

export const ProtectedRoute = () => {
    const { token } = useAppSelector(authSelector);

    if (token === null && !localStorage.getItem('token')) return <Navigate to={PATH.AUTH} />;
    return <Outlet />;
};
