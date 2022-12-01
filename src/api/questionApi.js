import axiosClients from './axiosClient';

const questionApi = {
	async createQuestion({ quizId, description, questionImage = '' }) {
		const formData = new FormData();
		formData.append('quiz_id', quizId);
		formData.append('description', description);
		formData.append('questionImage', questionImage ? questionImage[0].files : '');
		return await axiosClients.post('/question', formData);
	},

	async createAnswer({ question_id, description, isCorrect }) {
		const formData = new FormData();
		formData.append('question_id', question_id);
		formData.append('description', description);
		formData.append('correct_answer', isCorrect);
		return await axiosClients.post('/answer', formData);
	},
};

export default questionApi;
