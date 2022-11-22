export const PATH_ROUTES = {
	USER: {
		INDEX: '/',
		HOME: 'home',
		USER: 'user',
		QUIZ: 'quiz',
		QUIZ_DETAIL: 'quiz/:quizId',
	},
	AUTH: {
		INDEX: '/auth',
		LOGIN: 'login',
		REGISTER: 'register',
	},
	ADMIN: {
		INDEX: '/admin',
		MANAGE_QUIZZ: {
			INDEX: 'manage-quiz',
		},
		MANAGE_USERS: {
			INDEX: 'manage-users',
		},
	},
};

export const FULL_PATH_ROUTES = {
	AUTH_LOGIN: 'auth/login',
	AUTH_REGISTER: 'auth/register',
};

export const MODAL_TYPE = {
	MODAL_CREATE: 'MODAL_CREATE',
	MODAL_VIEW: 'MODAL_VIEW',
	MODAL_UPDATE: 'MODAL_UPDATE',
};
