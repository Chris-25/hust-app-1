import axios from 'axios';

export const host = 'http://localhost:8000';

const API = axios.create({ baseURL: host });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}

	return req;
});

export default API;
