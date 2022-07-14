import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-factory-55415-default-rtdb.firebaseio.com/'
})

export default instance;