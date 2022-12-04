import axiosClients from '@api/axiosClient.js';
import axiosClient from '@api/axiosClient.js';
import { createFormData, getToast } from '@helpers/index.js';

const quizApi = {
	async getQuizByParticipant() {
		return await axiosClient.get('/quiz-by-participant');
	},

	async getAllQuestionOfQuiz(quizId) {
		const questionPromise = axiosClient.get(`/questions-by-quiz?quizId=${quizId}`);
		const quizPromise = axiosClient.get(`/quiz/${quizId}`);
		const [question, quiz] = await Promise.all([questionPromise, quizPromise]);
		if (quiz && quiz.EC === 0) {
			question.title = quiz?.DT?.name;
		}
		return question;
	},

	async submitQuiz(data) {
		return await axiosClient.post('/quiz-submit', { ...data });
	},

	async createQuiz(data) {
		const formData = createFormData(data, 'quizImage');
		return await axiosClient.post('/quiz', formData);
	},

	async getQuizById(id) {
		return axiosClients.get(`/quiz/${id}`);
	},

	async getAllQuiz() {
		return await axiosClient.get('/quiz/all');
	},

	async updateQuiz(data) {
		const formData = new FormData();
		for (const key in data) {
			if (key === 'quizImage' && data[key] && data[key][0]) {
				formData.append(key, data[key]);
			} else {
				formData.append(key, data[key]);
			}
		}
		const response = await axiosClient.put('/quiz', formData);
		const { EC, EM } = response;
		getToast(EC, EM);
	},

	async deleteQuizById(id) {
		const response = await axiosClient.delete(`/quiz/${id}`);
		getToast(response.EC, response.EM);
		return response.EC;
	},
};
export default quizApi;
