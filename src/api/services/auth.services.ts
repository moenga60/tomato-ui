import { axiosInstance } from '../config/axios';
import { ENDPOINTS } from '../config/endpoints';
import { LoginRequest, LoginResponse } from '../types/auth';

export const authService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    },
};