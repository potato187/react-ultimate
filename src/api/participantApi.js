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

	update(user) {
		const url = 'participant';
		return axiosClients.put(url, user);
	},
};

export default participantApi;
