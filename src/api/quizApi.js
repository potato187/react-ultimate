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
		const formData = createFormData(data, 'quizImage');
		const response = await axiosClient.put('/quiz', formData);
		return response;
	},

	async createQuestion(data) {
		const formData = createFormData(data, 'questionImage');
		return await axiosClients.post('/question', formData);
	},

	async createAnswer(data) {
		const formData = createFormData(data);
		return await axiosClients.post('/answer', formData);
	},

	async getQAfromQuiz(quizId) {
		return await axiosClients.get(`/quiz-with-qa/${quizId}`);
	},

	async updateQA(data) {
		return await axiosClients.post('/quiz-upsert-qa', { ...data });
	},

	async deleteQuiz(id) {
		const { EC, EM } = await axiosClient.delete(`/quiz/${id}`);
		const response = await axiosClients.get(`/quiz-with-qa/${id}`);
		if (response.EC === 0 && response.DT && response.DT.qa && response.DT.qa.length > 0) {
			for (const question in DT.qa) {
				const { EC } = await axiosClients.delete('question', { data: { quizId: id, id: question.id } });
				if (EC !== 0) {
					break;
				}
			}
		}
		return { EC, EM, id };
	},
};
export default quizApi;
