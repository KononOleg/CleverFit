import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/selectors';

export const ProtectedRoute = () => {
    const { token } = useAppSelector(authSelector);

    if (!token) return <Navigate to={PATH.AUTH} />;

    return <Outlet />;
};
