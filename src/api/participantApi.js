import axiosClients from './axiosClient';

const participantApi = {
	getAll() {
		const url = '/participant/all';
		return axiosClients.get(url);
	},
	create(data) {
		const url = '/participant';
		return axiosClients.post(url, data);
	},
};

export default participantApi;
