import axiosClients from "@api/axiosClient.js";
import axiosClient from "@api/axiosClient.js";

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
    }
};

export default quizApi;