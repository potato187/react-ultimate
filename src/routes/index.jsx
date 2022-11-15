import App from '@/App';
import {PATH_ROUTES} from '@constant';
import {uuid} from '@helpers';
import {Navigate} from 'react-router-dom';
import HomePage from "@pages/Users/HomePage";
import Auth from "@pages/Auth";
import LoginPage from "@pages/Auth/LoginPage";
import Admin from "@pages/Admin";
import ManageUsers from "@pages/Admin/ManageUsers";
import ManageQuizz from "@pages/Admin/ManageQuizz";
import QuizPage from "@pages/Users/QuizPage";
import QuizDetailPage from "@pages/Users/QuizDetailPage/index.jsx";


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
                path: USER.QUIZ,
                Component: QuizPage,
            },
            {
                id: uuid(),
                path: USER.QUIZ_DETAIL,
                Component: QuizDetailPage,
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
                Component: LoginPage,
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
                path: ADMIN.MANAGE_USERS.INDEX,
                index: true,
                Component: ManageUsers,
            },
            {
                id: uuid(),
                path: ADMIN.MANAGE_QUIZZ.INDEX,
                Component: ManageQuizz,
            },
            {
                id: uuid(),
                index: true,
                Component: () => <Navigate replace to={ADMIN.MANAGE_USERS.INDEX}/>,
            },
            {
                id: uuid(),
                path: '*',
                Component: ManageUsers,
            },
        ],
    },
];
