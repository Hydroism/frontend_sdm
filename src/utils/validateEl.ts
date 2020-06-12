/**
 * 用户名校验规则
 */
export function elValidateUsername(rule: any, value: string, callBack: any): void {
  if (value === '') {
    callBack(new Error('请输入用户名'))
  }
  if (value.length < 3 || value.length > 20) {
    callBack(new Error('用户名长度为3-20位'))
  } else {
    callBack();
  }
}

/**
 * 密码校验规则
 */
export function elValidatePassword(rule: any, value: string, callBack: any): void {
  if (value === '') {
    callBack(new Error('请输入密码'))
  }
  if (value.length < 6 || value.length > 20) {
    callBack(new Error('密码长度为6-20位'))
  } else {
    callBack();
  }
}
