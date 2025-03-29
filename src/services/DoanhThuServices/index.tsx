import axios, { AxiosResponse } from "axios";
import { axiosConfig, axiosCustom, BASE_URL } from "../../config/configApi";

export const GetRevenueStats:  (startDate: any, endDate: any) => Promise<AxiosResponse<any>> = (startDate: any, endDate: any) => {
    return axiosConfig.get('/api/doanh-thu/thong-ke?startDate=' + startDate + '&endDate=' + endDate);
};
