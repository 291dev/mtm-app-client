import axios, { AxiosResponse } from "axios"
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/storeHooks";
import { HttpException } from "../interfaces/extapi/error";
import { Credentials, LoginReq, UserRegisterReq } from "../interfaces/extapi/userInfo"
import { getError } from "../reducers/errorReducer";
import { getCredentials, getUserInfo } from "../reducers/userReducer";
import { createErrorResponse } from "./errHandling";

export const LOGIN_URL = "api/v1/auth/user/login"
export const REGISTER_URL = "api/v1/auth/user/register"

/**
* ログインAPI
*
* @param {string} email
* @param {string} password
* @return {*} 
*/
const login = (email: string, password: string) => {
  const req: LoginReq = {
    email,
    password
  };
  return axios.post<LoginReq, AxiosResponse<any>>(LOGIN_URL, req);
}


const register = (req: UserRegisterReq) => {
  return axios.post<UserRegisterReq, AxiosResponse<string>>(REGISTER_URL, req)
}


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<HttpException>();
  const [responseData, setResponseData] = useState<AxiosResponse<any>>();
  const dispatch = useAppDispatch();
  const loginAction = useCallback(async (req: LoginReq) => {
    try {
      setLoading(true);
      const response = await login(req.email, req.password);
      console.log(response)
      setResponseData(response);
    } catch (err) {
      const res = createErrorResponse(err);
      setError(res);
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (responseData) {
      dispatch({
        type: getCredentials.type,
        payload: {
          accessToken: responseData.headers['jwt-access-token'],
          idToken: responseData.headers['jwt-id-token'],
          refleshToken: responseData.headers['jwt-reflesh-token']
        }
      })
      dispatch({
        type: getUserInfo.type,
        payload: {
          userId: responseData.data.userId,
          email: responseData.data.email,
          tel: responseData.data.tel,
          firstname: responseData.data.firstname
        }
      })

    } else if (error) {
      dispatch({
        type: getError.type,
        payload: error
      })
    }
  }, [responseData, error])

  return { loginAction, loading, error }
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<HttpException>();
  const [success, isSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const registerAction = async (req: UserRegisterReq) => {
    try {
      setLoading(true);
      await register(req);
      isSuccess(true);
    } catch (err) {
      const res = createErrorResponse(err);
      setError(res);
      isSuccess(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (error) {
      dispatch({
        type: getError.type,
        payload: error
      })
    }
  }, [error])

  return { registerAction, success, loading, error }
}