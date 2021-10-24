import { AxiosResponse } from "axios";
import axios from './axiosconfig'
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { HttpException } from "../interfaces/extapi/error";
import { ScheduleStore } from "../interfaces/extapi/schedule"
import { deleteSchedule, getSchedule, postSchedule } from "../reducers/scheduleReducer";
import _ from "lodash";
import { createErrorResponse } from "./errHandling";
import { getError } from "../reducers/errorReducer";
import { useAppDispatch } from "../hooks/storeHooks";
import { da } from "date-fns/locale";
import { Credentials } from "../interfaces/extapi/userInfo";
import { useAxiosMethodWithAutoLogin } from "./axiosHook";


const URL = '/api/v1/task';

const deleteTask = async (taskId: number) => {
  return await axios.delete<number, AxiosResponse<boolean>>(URL + "/" + taskId);
}

const REFLESH_URL = "/api/v1/auth/user/reflesh";




export const useScheduleRegister = () => {
  const { axiosCallBack, data, loading, error }
    = useAxiosMethodWithAutoLogin<ScheduleStore, ScheduleStore>('POST')

  const dispatch = useAppDispatch()
  const saveSchedule = useCallback(async (request: ScheduleStore) => {
    await axiosCallBack(URL, request);
  }, [])


  useEffect(() => {
    if (data) {
      dispatch({
        type: postSchedule.type,
        payload: data
      })
    }
    if (error) {
      dispatch({
        type: getError.type,
        payload: error
      })
    }
  }, [data, error])

  return { saveSchedule, loading, error }
}


export const useScheduleFetch = () => {
  const { axiosCallBack, data, loading, error }
    = useAxiosMethodWithAutoLogin<ScheduleStore[], undefined>('GET')
  const dispatch = useAppDispatch()
  const getSchedules = useCallback(async () => {
    await axiosCallBack(URL, undefined);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch({
        type: getSchedule.type,
        payload: _.mapKeys(data, "taskId")
      })
    }
    if (error) {
      dispatch({
        type: getError.type,
        payload: error
      })
    }
  }, [data, error])

  return { getSchedules, loading, error }
}

export const useScheduleDelete = () => {
  const { axiosCallBack, data, loading, error }
    = useAxiosMethodWithAutoLogin<void, undefined>('DELETE')
  const [taskId, setTaskId] = useState<number>();
  const dispatch = useAppDispatch()
  const deleteScheduleFunc = useCallback(async (taskId: number) => {
    await axiosCallBack(URL + '/' + taskId, undefined)
    setTaskId(taskId);
  }, [])
  useEffect(() => {
    if (taskId) {
      dispatch({
        type: deleteSchedule.type,
        payload: taskId
      })
    }
    if (error) {
      dispatch({
        type: getError.type,
        payload: error
      })
    }
  }, [taskId, error])
  return { deleteScheduleFunc, loading, error }
}
