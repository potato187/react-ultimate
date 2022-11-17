import axiosClients from "@api/axiosClient.js";
import axiosClient from "@api/axiosClient.js";
import {getToast} from "@helpers/index.js";

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
        return await axiosClient.post('/quiz-submit', {...data});
    },

     async createQuiz(data) {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await axiosClient.post('/quiz', formData);
        const { EC, EM } = response;
        getToast(EC, EM);
    }
};

export default quizApi;