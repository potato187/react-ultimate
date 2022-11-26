import { uuid } from '@/helpers';
import { PATH_ROUTES } from '@/constant';
import { TbDashboard } from 'react-icons/tb';
import { MdOutlineManageAccounts, MdOutlinePersonAdd } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

const { ADMIN } = PATH_ROUTES;

export const SIDEBAR_ROUTES = [
	{
		id: uuid(),
		label: 'Manage Users',
		icon: MdOutlineManageAccounts,
		to: ADMIN.MANAGE_USERS.INDEX,
		index: true,
		children: [],
	},
	{
		id: uuid(),
		label: 'Manage Quizzes',
		icon: MdOutlineManageAccounts,
		to: ADMIN.MANAGE_QUIZZES.INDEX,
		children: [],
	},
	{
		id: uuid(),
		label: 'Manage Questions',
		icon: MdOutlineManageAccounts,
		to: ADMIN.MANAGE_QUESTIONS.INDEX,
		children: [],
	},
];
