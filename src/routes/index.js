import App from '@/App';
import Admin from '@/components/Admin';
import CreateUser from '@/components/Admin/CreateUser/CreateUser';
import ManageUsers from '@/components/Admin/ManageUsers/ManageUsers';
import HomePage from '@/components/HomePage/HomePage';
import Users from '@/components/Users/Users';
import { PATH_ROUTES } from '@/constant';
import { uuid } from '@/helpers';
import Dashboard from '../components/Admin/Dashboard/Dashboard';

const { ADMIN } = PATH_ROUTES;

export const ROUTES = [
	{
		id: uuid(),
		Component: App,
		path: '/',
		children: [
			{
				index: true,
				id: uuid(),
				Component: HomePage,
			},
			{
				id: uuid(),
				path: '*',
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
				path: ADMIN.MANAGE_USERS.CREATE_USER,
				Component: CreateUser,
			},
			{
				id: uuid(),
				path: ADMIN.MANAGE_USERS.VIEW_USERS,
				Component: ManageUsers,
			},
		],
	},
];
