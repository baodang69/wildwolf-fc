import api from './axiosConfig';
import { AUTH } from './url';

// Định nghĩa kiểu dữ liệu cho form đăng nhập và đăng ký
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  fullname: string;
  club: string;
  phone: string;
}

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post(AUTH.LOGIN, credentials);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post(AUTH.SIGN_UP, data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(AUTH.LOGOUT);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get(AUTH.PROFILE);
  return response.data;
};

