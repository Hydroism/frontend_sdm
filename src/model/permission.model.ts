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
