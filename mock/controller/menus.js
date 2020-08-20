const data = [
  {
    id: 1,
    path: '/',
    component: 'Layout',
    meta: {
      title: '首页',
      icon: 'edit'
    },
    children: [
      {
        id: 2,
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
    id: 3,
    path: '/permission',
    component: 'Layout',
    meta: {
      title: '权限管理',
      icon: 'edit'
    },
    children: [
      {
        id: 4,
        path: 'roleManagement',
        name: 'roleManagement',
        component: 'permission/roleManagement',
        meta: {
          title: '角色管理'
        }
      },
      {
        id: 5,
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
    id: 6,
    path: '/table',
    component: 'Layout',
    meta: {
      title: '表格',
      icon: 'edit',
    },
    children: [
      {
        id: 7,
        path: 'tableTemplate',
        name: 'tableTemplate',
        component: 'table/tableTemplate',
        meta: {
          title: '测试表格',
          icon: 'edit',
        }
      },
      {
        id: 8,
        path: 'about234',
        name: 'about',
        component: 'About',
        meta: {
          title: '首页5',
          icon: 'edit',
        }
      },
      {
        id: 9,
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
    id: 10,
    path: '/error',
    component: 'Layout',
    meta: {
      title: '首页7',
      icon: 'edit',
    },
    children: [
      {
        id: 11,
        path: 'b401',
        name: '401',
        component: 'views/nested/index',
        meta: {
          title: '首页8',
          icon: 'edit',
        },
        children: [
          {
            id: 12,
            path: 'asdf',
            name: '401',
            component: 'views/About',
            meta: {
              title: '首页9',
              icon: 'edit'
            }
          },
          {
            id: 13,
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
        id: 14,
        path: 'about',
        name: 'about',
        component: 'views/About',
        meta: {
          title: '首页11',
          icon: 'edit',
        }
      },
      {
        id: 15,
        path: '401',
        name: '401',
        component: 'views/error-page/401',
        meta: {
          title: '首12',
          icon: 'edit',
        }
      }
    ]
  }]

export default [
  {
    url: 'mock/menus/list',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: data
      }
    }
  }
]
