/**
 * 用户名校验规则
 */
import {isAlphabetNumber} from "@/utils/validate";

export function elValidateUsername(rule: any, value: string, callBack: Function): void {
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
export function elValidatePassword(rule: any, value: string, callBack: Function): void {
  if (value === '') {
    callBack(new Error('请输入密码'))
  }
  if (value.length < 6 || value.length > 20) {
    callBack(new Error('密码长度为6-20位'))
  } else {
    callBack();
  }
}

/**
 * 由数字和26个英文字母组成的字符串
 */
export function elValidateAlphabetNumber(rule:any, value:string, callBack:Function) {
  if (isAlphabetNumber(value)){
    callBack()
  } else {
    callBack(new Error('只能由数字和26个字母组成的字符串'))
  }
}
