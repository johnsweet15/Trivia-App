import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../config";
import { getSessionTokenFromStorage } from "../utils";

export default class Request {
  [x: string]: any;
  constructor() {
    const token = getSessionTokenFromStorage();
    const params = token ? { token: token } : null;
    this.service = axios.create({
      baseURL: API_URL,
      params,
    });
  }

  get = async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<[AxiosResponse<any> | null, AxiosError<any> | null]> => {
    try {
      const response: AxiosResponse<any> = await this.service.get(url, config);
      return [response, null];
    } catch (error: any | null) {
      document
        .getElementById("app")
        ?.dispatchEvent(new CustomEvent("apiError", { detail: error }));
      return [null, error];
    }
  };

  post = async (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<[AxiosResponse<any> | null, AxiosError<any> | null]> => {
    try {
      const response: AxiosResponse<any> = await this.service.post(
        url,
        data,
        config
      );
      return [response, null];
    } catch (error: any | null) {
      return [null, error];
    }
  };
}
