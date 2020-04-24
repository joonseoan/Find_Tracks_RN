import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SECURE_STORE_KEY } from 'react-native-dotenv'; 

const instance = axios.create({
  baseURL: 'httt://localhost(or IP):4500'
});

instance.interceptors.request.use(
  async config => {
    const storedField = await SecureStore.getItemAsync(SECURE_STORE_KEY);
    const jsonToken = JSON.parse(storedField);
    let token = '';
    
    if(jsonToken) {
      token = jsonToken.token;
    }

    if(token) {
      config.headers.Authorization = `Bearer ${ token }`;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

export default instance;