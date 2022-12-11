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
		MANAGE_USERS: {
			INDEX: 'manage-users',
		},
		MANAGE_QUIZZES: {
			INDEX: 'manage-quiz',
		},
		MANAGE_QUESTIONS: {
			INDEX: 'manage-questions',
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

export const ACTION_TYPE = {
	ACTION_ADD: 'ADD_ACTION',
	ACTION_REMOVE: 'REMOVE_ACTION',
};

export const MODAL = {
	MODAL_CREATE: 'MODAL_CREATE',
	MODAL_VIEW: 'MODAL_VIEW',
	MODAL_UPDATE: 'MODAL_UPDATE',
};
