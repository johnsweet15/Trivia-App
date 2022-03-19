export const decode = (value: string) => {
  return decodeURIComponent(escape(window.atob(value)));
};
