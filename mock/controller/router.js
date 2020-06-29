const data = [
  {
    path: '/',
    component: 'Layout',
    meta: {
      title: '首页Layout',
      icon: 'edit'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: 'Home',
        meta: {
          title: '首页1',
          icon: 'edit'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: 'About',
        meta: {
          title: '首页2',
          icon: 'edit',
          noCache:true
        }
      }
    ]
  },
  {
    path: '/layout',
    component: 'Layout',
    meta: {
      title: '首页3',
      icon: 'edit',
    },
    children: [
      {
        path: '',
        name: 'about2',
        component: 'Home',
        meta: {
          title: '首页4',
          icon: 'edit',
        }
      },
      {
        path: 'about',
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
              icon: 'edit',
              affix: true
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
          permissions:['test']
        }
      },
      {
        path: '401',
        name: '401',
        component: 'views/error-page/401',
        meta: {
          title: '首12',
          icon: 'edit',
          permissions:['admin']
        }
      }
    ]
  }]

export default [
  {
    url: 'mock/router/routerList',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: data
      }
    }
  }
]
