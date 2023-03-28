import api from '../api/index.js'
import axios from 'axios';
// import { useMessage } from 'naive-ui';

const login = async (aimeNo) => {

    let data = JSON.stringify({ 'accessCode': aimeNo })

    return await axios.post(api.aimeId, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const logout = () => {
    localStorage.removeItem("aimeId");
    console.log("Logged out");
}

const isLoggedIn = () => {
    return localStorage.getItem("aimeId") !== null;
}

const getAimeId = () => {
    return localStorage.getItem("aimeId");
}

export default {
    login,
    logout,
    isLoggedIn,
    getAimeId,
}