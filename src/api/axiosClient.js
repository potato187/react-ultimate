import axios from 'axios';
import {store} from "@redux/store.js";

const axiosClients = axios.create({
	baseURL: 'http://localhost:8081/api/v1',
});

axiosClients.interceptors.request.use(
	function (config) {
		const access_token = store?.getState()?.user?.account?.access_token;
		config.headers['Authorization'] = `Bearer ${access_token}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosClients.interceptors.response.use(
	function (response) {
		return response && response.data ? response.data : response;
	},
	function (error) {
		return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
	}
);

export default axiosClients;
