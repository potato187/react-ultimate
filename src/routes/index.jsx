import App from '@/App';
import Admin from '@components/Admin';
import Dashboard from '@components/Admin/Dashboard/Dashboard';
import ManageUsers from '@components/Admin/ManageUsers';
import Auth from '@components/Auth';
import Login from '@components/Auth/Login';
import SignUp from '@components/Auth/SignUp';
import HomePage from '@components/HomePage/HomePage';
import Users from '@components/Users/Users';
import { PATH_ROUTES } from '@constant';
import { uuid } from '@helpers';
import { Navigate } from 'react-router-dom';

const { ADMIN, AUTH } = PATH_ROUTES;

export const ROUTES = [
	{
		id: uuid(),
		Component: App,
		path: '/',
		children: [
			{
				id: uuid(),
				path: '*',
				index: true,
				Component: HomePage,
			},
			{
				id: uuid(),
				path: 'users',
				Component: Users,
				children: [],
			},
		],
	},
	{
		id: uuid(),
		path: ADMIN.INDEX,
		Component: Admin,
		children: [
			{
				id: uuid(),
				path: ADMIN.DASHBOARD.INDEX,
				Component: Dashboard,
				index: true,
			},
			{
				id: uuid(),
				path: ADMIN.MANAGE_USERS.INDEX,
				Component: ManageUsers,
			},
		],
	},
	{
		id: uuid(),
		path: AUTH.INDEX,
		Component: Auth,
		children: [
			{
				id: uuid(),
				path: '*',
				index: true,
				Component: () => <Navigate replace to={AUTH.LOGIN} />,
			},
			{
				id: uuid(),
				path: AUTH.LOGIN,
				Component: Login,
			},
			{
				id: uuid(),
				path: AUTH.SIGN_UP,
				Component: SignUp,
			},
		],
	},
];
