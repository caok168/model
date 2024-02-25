// 本文件为axios预处理页
import axios from 'axios';
// 设置默认请求头，如果不需要可以取消这一步
axios.defaults.headers = {
  'X-Resquested-With': 'XMLHttpRequest',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
};

// process.env.BASE_URL

const errMsgObj = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
  undefined: '连接错误',
};

// 设置请求超时时间
axios.defaults.timeout = 30000;
// 开始请求设置，发起拦截处理
// config代表发起请求的参数实体
axios.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// 请求到结果的拦截处理
axios.interceptors.response.use(
  (config) => {
    const result = config;
    if (result && result.data) {
      const { data } = result;
      if (data.code === 0) return result;
      return Promise.reject(data);
    }
    result.message = '服务器处理异常';
    return Promise.reject(result);
  },
  (error) => {
    const wrong = error;
    // 错误的请求处理，这里根据后台返回的状态吗返回相应的信息
    if (wrong && wrong.response) {
      const { data, status } = wrong.response;
      if (data && data.message) {
        wrong.message = data.message;
      } else wrong.message = errMsgObj[status];
      if (status === 401) window.history.back();
    } else wrong.message = '链接服务器失败';
    return Promise.reject(wrong);
  },
);

export default axios;
