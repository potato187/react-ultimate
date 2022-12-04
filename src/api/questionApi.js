import { createFormData } from '@helpers/index';
import axiosClients from './axiosClient';

const questionApi = {
	async createQuestion(data) {
		const formData = createFormData(data, 'questionImage');
		return await axiosClients.post('/question', formData);
	},

	async createAnswer(data) {
		const formData = createFormData(data);
		return await axiosClients.post('/answer', formData);
	},
};

export default questionApi;
