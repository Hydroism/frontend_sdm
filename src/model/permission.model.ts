export interface PostRoleModel {
  roleName: string;
  roleCode: string;
  description: string;
}

export interface RoleModel {
  id: number;
  roleName: string;
  roleCode: string;
  description: string;
}

export interface RoleDetailModel extends PostRoleModel {
  routers: number[]
}

export interface ButtonPermission {
  id:number,
  buttons:PermissionButtonItem[]
}

export interface PermissionButtonItem {
  name: string,
  remarks: string,
  isEnable: boolean,
  permissionRoles: number[],
  permissionRoles_display: string
}
