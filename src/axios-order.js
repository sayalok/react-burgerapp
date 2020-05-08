import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-889d5.firebaseio.com/',
})

export default instance;