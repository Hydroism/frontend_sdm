const config = {
  baseUrl: process.env.VUE_APP_BASE_API,
};

// 本地开发环境下
// if (process.env.NODE_ENV === 'development') {
//   config.baseUrl = ""
// }
export default config;
