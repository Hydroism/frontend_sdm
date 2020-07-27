export interface PostRoleModel {
  roleName: string;
  roleCode: string;
  description: string;
}

export interface RoleDetailModel extends PostRoleModel {
  routers: number[]
}

export interface RoleModel {
  id: number;
  roleName: string;
  roleCode: string;
  description: string;
}

export interface ButtonPermission {
  id:number,
  buttons:PermissionButtonItem[]
}

export interface PermissionButtonItem {
  name: string,
  remarks: string,
  isEnable: boolean,
  permissionCode:string,
  permissionRoles: number[],
  permissionRoles_display: string
}
