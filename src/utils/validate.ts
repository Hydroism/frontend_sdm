/**
 * @description 校验是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description 校验密码格式 大于等于6位,且小于20位
 * @param str
 * @returns {boolean}
 */
export function isPassword(str:string):boolean {
  return str.length >= 6 && str.length < 20;
}

/**
 * @description 校验有户名格式 大于3位，且小于20位
 * @param str
 */
export function isUsername(str:string):boolean {
  return str.length >= 3 && str.length < 20
}
