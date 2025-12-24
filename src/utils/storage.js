// JWT token storage utilities
export const getToken = () => {
  return localStorage.getItem('vartasetu_token');
};

export const setToken = (token) => {
  localStorage.setItem('vartasetu_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('vartasetu_token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

