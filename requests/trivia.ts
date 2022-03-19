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

export const getCategories = async (
  sessionToken: string | null
): Promise<
  [AxiosResponse<CategoriesResponse> | null, AxiosError<any> | null]
> => {
  const tokenParam = sessionToken ? `?token=${sessionToken}` : "";
  return await request.get(`/api_category.php${tokenParam}`);
};

export const getQuestions = async (
  category: string,
  sessionToken: string | null,
  amount: number = 10
): Promise<
  [AxiosResponse<QuestionsResponse> | null, AxiosError<any> | null]
> => {
  const categoryParam = category !== "1" ? `category=${category}` : "";
  const tokenParam = sessionToken ? `&token=${sessionToken}` : "";
  return await request.get(
    `/api.php?${categoryParam}&amount=${amount}&encode=base64${tokenParam}`
  );
};
