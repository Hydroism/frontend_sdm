import axios from "axios"
import config from "@/utils/config";
import store from '@/store'
import {errorToast} from "@/plugins/toast";
import vue from "@/main";

const baseUrl = config.baseUrl;

const service = axios.create({
  baseURL: baseUrl,
  timeout: 20000
});

let elMessage: any;
const errorMsg = (message: string) => {
  return errorToast(message)
};

service.interceptors.request.use(config => {
  if (store.getters['user/token']) {
    config.headers['Authorization'] = `JWT ${store.getters['user/token']}`;
  }
  return config
}, function (error) {
  return Promise.reject(error);
});

service.interceptors.response.use(response => {
  const {status, data, config} = response;
  const {code, msg} = data;
  if (code === 200) {
    return Promise.resolve(response)
  }
  elMessage = errorMsg(msg || '请求错误');
  return Promise.reject(response.data);

}, async err => {
  if (elMessage) {
    elMessage.close();
  }
  console.log('错误', err.response);

  if (!err.response) {
    return Promise.reject(err.response)
  }

  switch (err.response.status) {
    case 400:
      elMessage = errorMsg(err.response.data.msg || '数据有误');
      break;
    case 401:
      elMessage = errorMsg('登陆失效,请重新登陆');
      await store.dispatch('user/resetToken');
      await vue.$router.replace('/login?redirect=' + vue.$route.fullPath);
      break;
    case 404:
      elMessage = errorMsg('未找到');
      break;
    case 500:
      elMessage = errorMsg('服务器发生错误,请稍后再试~');
      break;
    default:
      elMessage = errorMsg('不知道为什么~请求就是报错了')
  }
  return Promise.reject(err.response);
});


export function get(url: string, params?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service.get(url, {params: params}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    });
  })
}

export function getBlob(url: string, fileName: string, params?: object, onDownloadProgress?: (progressEvent: any) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    service.get(url, {params: params, responseType: 'blob', onDownloadProgress: onDownloadProgress}).then(res => {
      let blob = new Blob([res.data]);
      let objectUrl = window.URL.createObjectURL(blob);
      let dom = document.createElement('a');
      dom.style.display = 'none';
      dom.href = objectUrl;
      dom.setAttribute('download', fileName);
      document.body.appendChild(dom);
      dom.click();
      resolve();
    }).catch(err => {
      reject(err)
    });
  })
}

export function getBlobUrl(url: string, params?: any, onDownloadProgress?: (progressEvent: any) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    service.get(url, {params: params, responseType: 'blob', onDownloadProgress: onDownloadProgress}).then(res => {
      let blob = new Blob([res.data]);
      let objectUrl = window.URL.createObjectURL(blob);
      resolve(objectUrl);
    }).catch(err => {
      reject(err)
    });
  })
}

export function post(url: string, params?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    });
  })
}

export function put(url: string, params?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service.put(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    });
  })
}

export function pat(url: string, params?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service.patch(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    });
  })
}

export function del(url: string, params?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service.delete(url).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    });
  })
}
