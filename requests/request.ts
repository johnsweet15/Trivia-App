import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../config";

export default class Request {
  [x: string]: any;
  constructor() {
    this.service = axios.create({
      baseURL: API_URL,
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
