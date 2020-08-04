const data = [
  {
    id: 1,
    roleName: '管理员',
    roleCode: 'admin',
    description: '这是管理员，管理所有东西的',
    routers:[1,2,3,4,9,12]
  },
  {
    id: 2,
    roleName: '普通用户',
    roleCode: 'user',
    description: '这是普通用户，没什么用的，给他点东西就好了',
    routers:[1,7,11,12]
  }
];
const route = [
  {
    path: '/',
    component: 'Layout',
    meta: {
      title: '首页',
      icon: 'edit'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: 'Home',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/permission',
    component: 'Layout',
    meta: {
      title: '权限管理',
      icon: 'edit'
    },
    children: [
      {
        id:4,
        path: 'roleManagement',
        name: 'roleManagement',
        component: 'permission/roleManagement',
        meta: {
          title: '角色管理',
          noCache:true,
          affix: true
        }
      },
      {
        path: 'menuManagement',
        name: 'menuManagement',
        component: 'permission/menuManagement',
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  {
    path: '/table',
    component: 'Layout',
    meta: {
      componentId: 1,
      title: '表格',
      icon: 'edit',
    },
    children: [
      {
        id:7,
        path: 'tableTemplate',
        name: 'tableTemplate',
        component: 'table/tableTemplate',
        meta: {
          title: '测试表格',
          icon: 'edit',
        }
      },
      {
        path: 'about234',
        name: 'about',
        component: 'About',
        meta: {
          title: '首页5',
          icon: 'edit',
        }
      },
      {
        path: 'a401',
        name: 'a401',
        component: 'views/error-page/401',
        meta: {
          title: '首页6',
          icon: 'edit',
        }
      }
    ]
  },
  {
    path: '/error',
    component: 'Layout',
    meta: {
      title: '首页7',
      icon: 'edit',
    },
    children: [
      {
        path: 'b401',
        name: '401',
        component: 'views/nested/index',
        meta: {
          title: '首页8',
          icon: 'edit',
        },
        children: [
          {
            path: 'asdf',
            name: '401',
            component: 'views/About',
            meta: {
              title: '首页9',
              icon: 'edit'
            }
          },
          {
            path: 'asdf2',
            name: '401',
            component: 'views/About',
            meta: {
              title: '首页10',
              icon: 'edit',
            }
          }
        ]
      },
      {
        path: 'about',
        name: 'about',
        component: 'views/About',
        meta: {
          title: '首页11',
          icon: 'edit',
        }
      },
      {
        path: '401',
        name: '401',
        component: 'views/error-page/401',
        meta: {
          title: '首12',
          icon: 'edit',
        }
      }
    ]
  }];

const btnPermission = [
  {
  id: 4,
  buttons: [
    {
      name: 'roleManagement_add',
      remarks: '角色增加',
      isEnable: true,
      permissionCode:'4,0',
      permissionRoles: [1, 2],
      permissionRoles_display:"admin,developer"
    },
    {
      name: 'roleManagement_del',
      remarks: '角色删除',
      isEnable: true,
      permissionCode:'4,1',
      permissionRoles: [1],
      permissionRoles_display:"admin"
    }
  ]
},{
  id: 7,
  buttons: [
    {
      name: 'tableTemplate_add',
      remarks: '表格模板增加',
      isEnable: true,
      permissionCode:'7,0',
      permissionRoles: [1, 2],
      permissionRoles_display:"admin,developer"
    },
    {
      name: 'tableTemplate_del',
      remarks: '表格模板删除',
      isEnable: true,
      permissionCode:'7,1',
      permissionRoles: [1],
      permissionRoles_display:"admin"
    }
  ]
},];

export default [
  {
    url: 'mock/permission/roleList',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          count: 2,
          results: data
        }
      }
    }
  },
  {
    url: 'mock/permission/roleAll',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: data
      }
    }
  },
  {
    url: 'mock/permission/roleDetail',
    type: 'get',
    response: config => {
      const { id } = config.query;
      let role = {};
      for (const item of data) {
        if (item.id === +id) {
          role = item
        }
      }
      return {
        code: 200,
        data: { ...role, }
      }
    }
  },
  {
    url: 'mock/permission/routerList',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: route
      }
    }
  },

  /**
   * 获取路由菜单对应的有权限的角色id
   */
  {
    url: 'mock/permission/routerOnRoles',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: [1]
      }
    }
  },

  /**
   * 菜单id对应的按钮权限
   */
  {
    url: 'mock/permission/routerOnButton',
    type: 'get',
    response: config => {
      const { id } = config.query;
      let data = {};
      const item = btnPermission.find(e => e.id === +id);
      data = item ? item : { id: id, buttons: [] };
      return {
        code: 200,
        data: data
      }
    }
  }
]
