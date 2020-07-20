export interface ViewsModel {
  id: number,
  component: string,
  label: string,
  buttons: PermissionButtonModel[]
}

export interface PermissionButtonModel {
  id: number,
  label: string,
  name: string,
  permission: number
}
