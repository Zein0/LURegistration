import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const instance = axios.create({
	baseURL: "http://localhost:8000/api/v1/user/",
});

instance.interceptors.request.use((config) => {
	config.headers = {
		Authorization: `Bearer ${Cookies.get("access_token")}`,
		"ngrok-skip-browser-warning": true,
	};
	return config;
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			window.location.href = "/login";
			Cookies.remove("access_token");
		} else {
			return Promise.reject(error);
		}
	}
);

instance.defaults.headers.post["Accept"] = "application/json";

export default instance;
