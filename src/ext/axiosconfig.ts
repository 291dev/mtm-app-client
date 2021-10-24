import axios from "axios";
import { store } from "../interfaces/store";

axios.interceptors.request.use((conf) => {
  console.log('intercepting')
  const token = store.getState().userInfo.credentials.accessToken;
  conf.headers.Authorization = `Bearer ${token}`
  conf.headers['jwt-reflesh-token'] = store.getState().userInfo.credentials.refleshToken;
  return conf;
})

export default axios;