import { AxiosError, AxiosResponse } from "axios";
import {
  CategoriesResponse,
  QuestionsResponse,
  TokenResponse,
} from "../interfaces";
import Request from "./request";

const request = new Request();

export const getSessionToken = async (): Promise<
  [AxiosResponse<TokenResponse> | null, AxiosError<any> | null]
> => {
  return await request.get("/api_token.php?command=request");
};

export const getCategories = async (): Promise<
  [AxiosResponse<CategoriesResponse> | null, AxiosError<any> | null]
> => {
  return await request.get("/api_category.php");
};

export const getQuestions = async (
  category: string,
  amount: number = 10
): Promise<
  [AxiosResponse<QuestionsResponse> | null, AxiosError<any> | null]
> => {
  const categoryParam = category !== "1" ? `category=${category}` : "";
  return await request.get(
    `/api.php?${categoryParam}&amount=${amount}&encode=base64`
  );
};
