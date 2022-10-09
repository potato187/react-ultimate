import App from '../App';
import Admin from '../components/Admin/Admin';
import HomePage from '../components/HomePage/HomePage';
import Users from '../components/Users/Users';
import { uuid } from '../helpers';

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
			{
				id: uuid(),
				path: 'admin',
				Component: Admin,
				children: [],
			},
		],
	},
];
