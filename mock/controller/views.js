import Mock from "mockjs";

const views = [
  {
    id: 1,
    component: "Layout",
    label: "布局框架"
  },
  {
    id: 2,
    component: "Home",
    label: "首页"
  },
  {
    id: 3,
    component: "permission/roleManagement",
    label: "角色管理"
  },
  {
    id: 4,
    component: "permission/menuManagement",
    label: "菜单管理"
  },
  {
    id: 5,
    component: "permission/viesManagement",
    label: "视图管理"
  },
  {
    id: 6,
    component: "table/tableTemplate",
    label: "表格模板",
    buttons: [
      {
        id: 1,
        label: '添加',
        name: 'table:add',
        permission: 1
      },
      {
        id: 2,
        label: '删除',
        name: 'table:del',
        permission: 3
      }
    ]
  }
];


const count = 100

for (let i = 0; i < count; i++) {
  views.push(Mock.mock({
    id: '@increment',
    component: '@first',
    label: '@first',
  }))
}

export default [
  {
    url: 'mock/views/viesList',
    type: 'get',
    response: config => {
      const { page, page_size } = config.query;
      const count = views.length;
      const viewsList = views.slice(page_size * (page - 1), page_size * page);
      return {
        code: 200,
        data: {
          count: count,
          results: viewsList
        },
        msg: 'success'
      }
    }
  }
]
