// 添加权限
export const addPermission = (userCode: any, permission: Permission): string => {
  const userPermission = userCode ? userCode.split(",") : [];
  const [index, pos] = permission.permissionCode.split(",");

  userPermission[index] = (userPermission[index] || 0) | Math.pow(2, +pos);

  return userPermission.join(",")
};

// 删除权限
export const delPermission = (userCode: any, permission: Permission): string => {
  const userPermission = userCode ? userCode.split(",") : [];
  const [index, pos] = permission.permissionCode.split(",");

  userPermission[index] = (userPermission[index] || 0) & (~Math.pow(2, +pos));

  return userPermission.join(",")
};

// 判断是否有权限
export const hasPermission = (userCode: any, permission: Permission): boolean => {
  const userPermission = userCode ? userCode.split(",") : [];
  const [index, pos] = permission.permissionCode.split(",");
  const permissionValue = Math.pow(2, +pos);

  return (userPermission[index] & permissionValue) === permissionValue
};

export interface Permission {
  name?: string,
  remarks?: string,
  isEnable?: boolean,
  permissionCode:string,
  permissionRoles?: number[],
  permissionRoles_display?: string
}
