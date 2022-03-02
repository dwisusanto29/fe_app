import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api';
const API_URL = "http://localhost:8000/api/";

const register = (name, email, password) => {
    return axios.post(API_URL + 'register', {
        name,
        email,
        password
    });
};

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', {
        email,
        password
    });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = async () => {
    localStorage.removeItem('token');
    return axios.post(API_URL + 'logout').then(response => { return response.data; });
};

const getCurrentUser = () => {
    return axios.get(API_URL + 'user', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        return response.data;
    });
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
}

export default AuthService;
