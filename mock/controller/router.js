const data = [
  {
    path: '',
    children: [
      {
        path: '/home',
        name: 'about',
        meta: {
          title: '首页',
          icon: 'edit',
          affix: true
        }
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    meta: {
      title: '错误页错误页',
      icon: 'bug'
    },
    children: [
      {
        path: '/401',
        name: 'about2',
        meta: {
          title: '401',
        },
        children: [
          {
            path: '/asdf',
            name: 'about212',
            meta: {
              title: '首页1',
              icon: 'edit',
              affix: true
            }
          },
          {
            path: '/wer',
            name: 'about22',
            meta: {
              title: '首页2',
              affix: true
            }
          },
        ]
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '404',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/error2',
    name: 'error2',
    meta: {
      title: '错误页22',
      icon: 'bug'
    }
  },
  {
    path: '/layout',
    name: 'error2',
    meta: {
      title: '错误页22',
      icon: 'bug'
    },
    children: [
      {
        path: '/401',
        name: '401',
        meta: {
          title: '错误404',
          icon: 'list'
        }
      }
    ]
  }
];

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
