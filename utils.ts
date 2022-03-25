export const decode = (value: string) => {
  return decodeURIComponent(escape(window.atob(value)));
};

export const getSessionTokenFromStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return window.sessionStorage.getItem("token");
  }
  return null;
};
