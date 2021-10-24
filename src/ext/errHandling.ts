import { HttpException } from "../interfaces/extapi/error"
import axios from "./axiosconfig"

export const createErrorResponse = (err: unknown) => {
  let res: HttpException = {
    statusCode: 0,
    message: ""
  }
  if (axios.isAxiosError(err)) {
    if (err.response) {
      res = {
        statusCode: err.response.status,
        message: err.response.data.message
      }
    } else {
      res = {
        statusCode: 500,
        message: err.message
      }
    }
  }
  return res;
}