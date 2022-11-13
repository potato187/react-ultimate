import axiosClients from "@api/axiosClient.js";
import axiosClient from "@api/axiosClient.js";

const questionApi = {
    async getQuestionByParticipant() {
        return await axiosClient.get('/quiz-by-participant');
    },

    async getQuestionById(id) {
        return await axiosClient.get(`/questions-by-quiz?quizId=${id}`);
    },

    async getQuizById(id) {
        return await axiosClient.get(`/quiz/${id}`);
    },

    async postQuestions(data) {
        return await axiosClient.post('/quiz-submit', { ...data });;
    }
};

export default  questionApi;