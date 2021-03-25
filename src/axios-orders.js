import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-838fd-default-rtdb.firebaseio.com/',
});

export default instance;
