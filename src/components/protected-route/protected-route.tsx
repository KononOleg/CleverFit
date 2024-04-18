import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/selectors';
import { PATH } from '@routes/path';

export const ProtectedRoute = () => {
    const { token } = useAppSelector(authSelector);

    if (!token) return <Navigate to={PATH.AUTH} />;

    return <Outlet />;
};
