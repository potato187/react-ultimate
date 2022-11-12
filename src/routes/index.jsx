import App from '@/App';
import Admin from '@components/Admin';
import Dashboard from '@components/Admin/Dashboard';
import ManageUsers from '@components/Admin/ManageUsers';
import Auth from '@components/Auth';
import LoginPage from '@components/Auth/LoginPage/index.jsx';
import RegisterPage from '@components/Auth/RegisterPage';
import HomePage from '@components/Users/HomePage';
import {PATH_ROUTES} from '@constant';
import {uuid} from '@helpers';
import {Navigate} from 'react-router-dom';
import QuestionPage from "@components/Users/QuestionPage/index.jsx";
import QuestionDetailPage from "@components/Users/QuestionDetailPage/index.jsx";

const {USER, ADMIN, AUTH} = PATH_ROUTES;

export const PAGE_ROUTES = [
    {
        id: uuid(),
        path: USER.INDEX,
        Component: App,
        children: [
            {
                id: uuid(),
                path: USER.HOME,
                Component: HomePage,
            },
            {
                id: uuid(),
                path: USER.QUESTION,
                Component: QuestionPage,
            },
            {
                id: uuid(),
                path: USER.QUESTION_DETAIL,
                Component: QuestionDetailPage,
            },
            {
                id: uuid(),
                index: true,
                Component: () => <Navigate replace to={USER.HOME}/>,
            },
            {
                id: uuid(),
                path: '*',
                Component: () => <Navigate replace to={USER.HOME}/>,
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
                path: AUTH.LOGIN,
                Component: LoginPage,
            },
            {
                id: uuid(),
                path: AUTH.REGISTER,
                Component: RegisterPage,
            },
            {
                id: uuid(),
                path: '*',
                Component: () => <Navigate replace to={AUTH.LOGIN}/>,
            },
            {
                id: uuid(),
                index: true,
                Component: () => <Navigate replace to={AUTH.LOGIN}/>,
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
            },
            {
                id: uuid(),
                path: ADMIN.MANAGE_USERS.INDEX,
                index: true,
                Component: ManageUsers,
            },
            {
                id: uuid(),
                index: true,
                Component: () => <Navigate replace to={ADMIN.MANAGE_USERS.INDEX}/>,
            },
            {
                id: uuid(),
                path: '*',
                Component: () => <Navigate replace to={ADMIN.MANAGE_USERS.INDEX}/>,
            },
        ],
    },
];
