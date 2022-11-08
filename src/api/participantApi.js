import axiosClients from './axiosClient';
import queryString from 'query-string';
import { getToast } from '@helpers';

const participantApi = {
	getAll() {
		const url = '/participant/all';
		return axiosClients.get(url);
	},

	async getFilter(params) {
		const newParams = { ...params };
		newParams.page = !params.page || params.page <= 0 ? 1 : params.page;
		const response = await axiosClients('/participant', { params: newParams });
		return response;
	},

	async create(formData) {
		const url = '/participant';
		const response = await axiosClients.post(url, formData);
		const { EC, EM, DT } = response;
		getToast(EC, EM);
		return EC === 0 ? DT : null;
	},

	async update(user) {
		const url = '/participant';
		const response = await axiosClients.put(url, user);
		const { EC, EM, DT } = response;
		getToast(EC, EM);
		return EC === 0 ? DT : null;
	},

	async delete(userId) {
		const url = '/participant';
		const formData = new FormData();
		formData.append('id', userId);
		const response = await axiosClients.delete(url, { data: { id: userId } });
		const { EC, EM, DT } = response;
		getToast(EC, EM);
		return EC === 0 ? DT : null;
	},
};

export default participantApi;
