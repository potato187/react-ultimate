import App from '@/App';
import Admin from '@components/Admin';
import Dashboard from '@components/Admin/Dashboard';
import ManageUsers from '@components/Admin/ManageUsers';
import Auth from '@components/Auth';
import LoginPage from '@components/Auth/LoginPage';
import RegisterPage from '@components/Auth/RegisterPage';
import HomePage from '@components/HomePage';
import Users from '@components/Users';
import {PATH_ROUTES} from '@constant';
import {uuid} from '@helpers';
import {Navigate} from 'react-router-dom';

const {HOME_PAGE, ADMIN, AUTH } = PATH_ROUTES;

export const ROUTES = [
	{
		id: uuid(),
		Component: App,
		children: [
			{
				id: uuid(),
				path: HOME_PAGE.USER,
				Component: Users,
			},
			{
				id: uuid(),
				index: true,
				path: HOME_PAGE.HOME,
				Component: HomePage,
			},
			{
				id: uuid(),
				path: '*',
				index: true,
				Component: () => <Navigate replace to={HOME_PAGE.HOME} />,
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
				path: '*',
				index: true,
				Component: () => <Navigate replace to={ADMIN.MANAGE_USERS.INDEX} />,
			},
			{
				id: uuid(),
				path: ADMIN.DASHBOARD.INDEX,
				Component: Dashboard,
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
				Component: LoginPage,
			},
			{
				id: uuid(),
				path: AUTH.SIGN_UP,
				Component: RegisterPage,
			},
		],
	},
];
