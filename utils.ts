import { getSessionToken } from "./requests/trivia";

export const setSessionToken = async () => {
  const [response] = await getSessionToken();
  const sessionToken = response?.data?.token || null;
  if (sessionToken) {
    sessionStorage.setItem("token", sessionToken);
  }
};

// export const getTokenFromStorage: string | null = () => {
//   return sessionStorage.getItem("token");
// };

export const decode = (value: string) => {
  return decodeURIComponent(escape(window.atob(value)));
};
