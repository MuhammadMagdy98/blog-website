import Api from './api';
import { ENDPOINTS } from '@/constant/Url';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
class AuthApi extends Api {
  static async getUserDetails() {
    return Api.get(ENDPOINTS.AUTH.ME);
  }
  static async login(userData: LoginRequest) {
    return Api.post(ENDPOINTS.AUTH.LOGIN, userData);
  }
  static async register(userData: RegisterRequest) {
    return Api.post(ENDPOINTS.AUTH.REGISTER, userData);
  }
  static async logout() {
    return Api.post(ENDPOINTS.AUTH.LOGOUT);
  }
}

export default AuthApi;