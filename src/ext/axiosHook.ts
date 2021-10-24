import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "../hooks/storeHooks";
import { HttpException } from "../interfaces/extapi/error";
import { Credentials } from "../interfaces/extapi/userInfo";
import { persistor } from "../interfaces/store";
import { getAccessTokenAndIdToken } from "../reducers/userReducer";
import axios from "./axiosconfig";
import { createErrorResponse } from "./errHandling";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
const REFLESH_URL = "/api/v1/auth/user/reflesh";

/**
 * axiosのラッパーフック。forbidden時にトークンリストアを行う。
 *
 * @template V axiosレスポンスの型
 * @template K axiosリクエストの型
 * @param {HttpMethod} method
 * @return {*} 
 */
export const useAxiosMethodWithAutoLogin = <V, K>(method: HttpMethod) => {
  const [data, setData] = useState<V>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<HttpException>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const axiosCallBack = useCallback(async (url: string, request: K) => {
    try {
      console.log('called initial axios request')
      setLoading(true);
      if (method === 'GET') {
        const response = await axios.get<V>(url);
        setData(response.data);
      } else if (method === 'POST') {
        const response = await axios.post<K, AxiosResponse<V>>(url, request);
        setData(response.data);
      } else if (method === 'PUT') {
        const response = await axios.put<K, AxiosResponse<V>>(url, request);
        setData(response.data);
      } else if (method === 'DELETE') {
        const response = await axios.delete<K, AxiosResponse<V>>(url, request);
        setData(response.data);
      }
      console.log('finished initial axios request')
    } catch (err) {
      const exception = createErrorResponse(err);
      if (exception.statusCode === 403) {
        try {
          const response = await axios.get<Credentials>(REFLESH_URL);
          //ここでStoreに更新後のトークンが入る想定
          const accessTokenAndIdToken: Credentials = {
            accessToken: response.headers['jwt-access-token'],
            idToken: response.headers['jwt-id-token'],
            // ここのDispatchでは使われない
            refleshToken: ''
          }
          console.log("dispacthed credentials by reflesh token.")
          dispatch({
            type: getAccessTokenAndIdToken.type,
            payload: accessTokenAndIdToken
          })
          console.log('token restored')
          console.log('called second axios request')
          if (method === 'GET') {
            const response = await axios.get<V>(url);
            setData(response.data);
          } else if (method === 'POST') {
            const response = await axios.post<K, AxiosResponse<V>>(url, request);
            setData(response.data);
          } else if (method === 'PUT') {
            const response = await axios.put<K, AxiosResponse<V>>(url, request);
            setData(response.data);
          } else if (method === 'DELETE') {
            const response = await axios.delete<K, AxiosResponse<V>>(url, request);
            setData(response.data);
          }
          console.log('finished second axios request')
        } catch (e) {
          const exception = createErrorResponse(e);
          console.error(exception.message);

          if (exception.message === 'Reflesh token expired') {
            persistor.purge();
            window.location.reload();
            return;
          }

          setError(exception);
          setLoading(false);
        }
      } else {
        setError(exception);
        setLoading(false);
      }
    }
    setLoading(false);
  }, [])

  return { axiosCallBack, data, loading, error }

}
