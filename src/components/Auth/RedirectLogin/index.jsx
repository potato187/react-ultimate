import { Navigate } from 'react-router-dom';

const RedirectLogin = () => {
	return <Navigate replace to='login' />;
};

export default RedirectLogin;
