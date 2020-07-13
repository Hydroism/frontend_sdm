import {Message, MessageBox} from 'element-ui';

export const successToast = (msg = "成功") => {
  Message({
    showClose: true,
    message: msg,
    type: "success"
  })
};

export const warnToast = (msg = "警告") => {
  Message({
    showClose: true,
    message: msg,
    type: "warning"
  })
};

export const errorToast = (msg = "错误") => {
  Message({
    showClose: true,
    message: msg,
    type: "error"
  })
};

export const confirmToast = (msg = "是否确认", callBack: Function, cancelCallBack: Function) => {
  MessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    callBack()
  }).catch(() => {
    cancelCallBack()
  })
};

export default function (Vue: any) {
  Vue.prototype.$hySuccess = successToast;

  Vue.prototype.$hyWarn = warnToast;

  Vue.prototype.$hyError = errorToast;

  Vue.prototype.$hyConfirm = confirmToast
};
