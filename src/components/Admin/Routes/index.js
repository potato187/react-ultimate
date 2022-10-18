import { uuid } from '@/helpers';
import { PATH_ROUTES } from '@/constant';
import { TbDashboard } from 'react-icons/tb';
import { MdOutlineManageAccounts, MdOutlinePersonAdd } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

const { ADMIN } = PATH_ROUTES;

export const SIDEBAR_ROUTES = [
	{
		id: uuid(),
		label: 'Dashboard',
		to: ADMIN.DASHBOARD.INDEX,
		icon: TbDashboard,
		children: [],
	},
	{
		id: uuid(),
		label: 'Manage Users',
		icon: MdOutlineManageAccounts,
		to: ADMIN.MANAGE_USERS.INDEX,
		children: [],
	},
];
