import axiosClients from './axiosClient';
import queryString from 'query-string';
import { getToast } from '@helpers';

const authApi = {
	async login({ email, password }) {
		const url = '/login';
		const response = await axiosClients.post(url, { email, password });
		const { EC, DT } = response;
		return EC === 0 ? DT : null;
	},

	async register({ username, email, password }) {
		const url = '/register';
		const response = await axiosClients.post(url, { username, email, password });
		const { EC, EM, DT } = response;
		getToast(EC, EM);
		return EC === 0 ? DT : null;
	},
};

export default authApi;
