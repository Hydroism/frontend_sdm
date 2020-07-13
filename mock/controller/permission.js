const data = [
  {
    id: 1,
    roleName: '管理员',
    roleCode: 'admin',
    description: '这是管理员，管理所有东西的'
  },
  {
    id: 2,
    roleName: '普通用户',
    roleCode: 'user',
    description: '这是普通用户，没什么用的，给他点东西就好了'
  }
];
const route = [
  {
    path: '/',
    component: 'Layout',
    componentName: 'Layout',
    meta: {
      title: '首页',
      icon: 'edit'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: 'Home',
        componentName: 'Home',
        meta: {
          title: '首页',
          icon: 'edit',
          affix: true
        }
      }
    ]
  },
  {
    path: '/permission',
    component: 'Layout',
    componentName: 'Layout',
    meta: {
      title: '权限管理',
      icon: 'edit'
    },
    children: [
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: 'permission/roleManagement',
        componentName: 'permission/roleManagement',
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'menuManagement',
        name: 'menuManagement',
        component: 'permission/menuManagement',
        componentName: 'permission/menuManagement',
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  {
    path: '/layout',
    component: 'Layout',
    componentName: 'Layout',
    meta: {
      title: '首页3',
      icon: 'edit',
    },
    children: [
      {
        path: 'home23',
        name: 'about2',
        component: 'Home',
        componentName: 'Home',
        meta: {
          title: '首页4',
          icon: 'edit',
        }
      },
      {
        path: 'about234',
        name: 'about',
        component: 'About',
        componentName: 'About',
        meta: {
          title: '首页5',
          icon: 'edit',
        }
      },
      {
        path: 'a401',
        name: 'a401',
        component: 'views/error-page/401',
        componentName: 'views/error-page/401',
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
    componentName: 'Layout',
    meta: {
      title: '首页7',
      icon: 'edit',
    },
    children: [
      {
        path: 'b401',
        name: '401',
        component: 'views/nested/index',
        componentName: 'views/nested/index',
        meta: {
          title: '首页8',
          icon: 'edit',
        },
        children: [
          {
            path: 'asdf',
            name: '401',
            component: 'views/About',
            componentName: 'views/About',
            meta: {
              title: '首页9',
              icon: 'edit'
            }
          },
          {
            path: 'asdf2',
            name: '401',
            component: 'views/About',
            componentName: 'views/About',
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
        componentName: 'views/About',
        meta: {
          title: '首页11',
          icon: 'edit',
        }
      },
      {
        path: '401',
        name: '401',
        component: 'views/error-page/401',
        componentName: 'views/error-page/401',
        meta: {
          title: '首12',
          icon: 'edit',
        }
      }
    ]
  }];
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
        data: role
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
  {
    url: 'mock/permission/routerOnRoles',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: [1]
      }
    }
  }
]
