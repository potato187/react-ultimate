import axiosClients from './axiosClient';

const participantApi = {
	add(data) {
		const url = '/participant';
		return axiosClients.post(url, data);
	},
};

export default participantApi;
