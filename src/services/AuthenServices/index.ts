import axios, { AxiosResponse } from "axios";
import { axiosConfig, axiosCustom, BASE_URL } from "../../config/configApi";

export const login: (body: any) => Promise<AxiosResponse<any>> = (body: any) => {
    return axiosConfig.post("/api/Authen/Login", body);
};

export const loginAdmin: (body: any) => Promise<AxiosResponse<any> | null> = async (body: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/Authen/LoginAdmin`, body);
    
        return response; // Sẽ nhận được "Đăng nhập thành công"
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        return null;
      }
};

export const refreshToken: (body: any) => Promise<AxiosResponse<any>> = (body: any) => {
  return axiosCustom.post("/api/Authen/RefreshToken/refresh-token", body);
};

export const UpdatePassword: (body: any) => Promise<AxiosResponse<any>> = (body: any) => {
  return axiosConfig.put("/api/Authen/UpdatePassword", body);
};

export const UpdateEmail: (body: any) => Promise<AxiosResponse<any>> = (body: any) => {
  return axiosConfig.put("/api/Authen/UpdateEmail", body);
};

export const UpdatePhone: (body: any) => Promise<AxiosResponse<any>> = (body: any) => {
  return axiosConfig.put("/api/Authen/UpdatePhone", body);
};
export const getDetailAcc: () => Promise<AxiosResponse<any>> = () => {
  return axiosConfig.get("/api/Authen/getDetailAcc");
};