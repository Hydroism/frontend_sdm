const data = [
  {
    path: '/',
    children: [
      {
        path: '',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/error',
    meta: {
      title: '错误页',
      icon: 'bug'
    },
    children: [
      {
        path: '/401',
        meta: {
          title: '401',
          icon: 'edit'
        }
      },
      {
        path: '/404',
        meta: {
          title: '404',
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
