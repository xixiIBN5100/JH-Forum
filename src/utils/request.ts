import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_HOST,
    timeout: 30000,
});

// 请求拦截器，用于添加鉴权头部
service.interceptors.request.use(
    (config) => {
        //console.log('请求配置:', config);
        const token = localStorage.getItem('PAOPAO_TOKEN');
        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        console.error('请求拦截器错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器，用于处理API响应
service.interceptors.response.use(
    (response) => {
        // console.log('响应数据:', response); 控制台输出响应数据
        const { data, code } = response.data || {};
        if (code === 0) {
            return data || {};
        } else {
            return Promise.reject(response.data || {});
        }
    },
    (error) => {
        console.error('响应拦截器错误:', error); // 报错处理
        const { response } = error;
        if (response?.status === 401) {
            localStorage.removeItem('PAOPAO_TOKEN');
            if (response?.data?.code !== 10005) {
                window.$message.warning(response?.data?.msg || '鉴权失败');
            } else {
                window.$store.commit('triggerAuth', true);
            }
        } else {
            window.$message.error(response?.data?.msg || '请求失败');
        }
        return Promise.reject(response?.data || {});
    }
);

export default service;
export function request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
    //console.log('发起请求:', config);
    return service(config) as unknown as Promise<R>;
}
