export const PATH_ROUTES = {
    USER: {
        INDEX: '/',
        HOME: 'home',
        USER: 'user',
        QUESTION: 'question',
        QUESTION_DETAIL: 'question/:id'
    },
    AUTH: {
        INDEX: '/auth',
        LOGIN: 'login',
        REGISTER: 'register',
    },
    ADMIN: {
        INDEX: '/admin',
        MANAGE_QUESTIONS: {
            INDEX: 'manage-questions',
        },
        MANAGE_USERS: {
            INDEX: 'manage-users',
        },
    },
};

export const FULL_PATH_ROUTES = {
    AUTH_LOGIN: 'auth/login',
    AUTH_REGISTER: 'auth/register',
}