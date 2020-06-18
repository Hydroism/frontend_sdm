// const data = [
//   {
//     path: '',
//     children: [
//       {
//         path: '/home',
//         name: 'about',
//         meta: {
//           title: '首页',
//           icon: 'edit',
//           affix: true
//         }
//       }
//     ]
//   },
//   {
//     path: '/error',
//     name: 'error',
//     meta: {
//       title: '错误页错误页',
//       icon: 'bug'
//     },
//     children: [
//       {
//         path: '/401',
//         name: 'about2',
//         meta: {
//           title: '401',
//         },
//         children: [
//           {
//             path: '/asdf',
//             name: 'about212',
//             meta: {
//               title: '首页1',
//               icon: 'edit',
//               affix: true
//             }
//           },
//           {
//             path: '/wer',
//             name: 'about22',
//             meta: {
//               title: '首页2',
//               affix: true
//             }
//           },
//         ]
//       },
//       {
//         path: '/404',
//         name: '404',
//         meta: {
//           title: '404',
//           icon: 'list'
//         }
//       }
//     ]
//   },
//   {
//     path: '/error2',
//     name: 'error2',
//     meta: {
//       title: '错误页22',
//       icon: 'bug'
//     }
//   },
//   {
//     path: '/layout',
//     name: 'error2',
//     meta: {
//       title: '错误页22',
//       icon: 'bug'
//     },
//     children: [
//       {
//         path: '/401',
//         name: '401',
//         meta: {
//           title: '错误404',
//           icon: 'list'
//         }
//       }
//     ]
//   }
// ];

const data = [
  {
    path: '/',
    component: 'Layout',
    meta: {
      title: '首页',
      icon: 'edit',
      affix: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: 'Home.vue',
        meta: {
          title: '首页',
          icon: 'edit',
          affix: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: 'About.vue',
        meta: {
          title: '首页',
          icon: 'edit',
          affix: true
        }
      }
    ]
  },
  {
    path: '/layout',
    component: 'Layout',
    meta: {
      title: '首页2',
      icon: 'edit',
      affix: true
    },
    children: [
      {
        path: '',
        name: 'about2',
        component: 'Home.vue',
        meta: {
          title: '首页2',
          icon: 'edit',
          affix: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: 'About.vue',
        meta: {
          title: '首页2',
          icon: 'edit',
          affix: true
        }
      },
      {
        path: 'a401',
        name: 'a401',
        component: 'views/error-page/401.vue',
        meta: {
          title: '首页3',
          icon: 'edit',
          affix: true
        }
      }
    ]
  },
  {
    path: '/error',
    component: 'Layout',
    meta: {
      title: '首页4',
      icon: 'edit',
      affix: true
    },
    children: [
      {
        path: 'b401',
        name: '401',
        component: 'views/nested/index.vue',
        meta: {
          title: '首页3',
          icon: 'edit',
          affix: true
        },
        children: [
          {
            path: 'asdf',
            name: '401',
            component: 'views/About.vue',
            meta: {
              title: '首页234',
              icon: 'edit',
              affix: true
            }
          },
          {
            path: 'asdf',
            name: '401',
            component: 'views/About.vue',
            meta: {
              title: '首页234',
              icon: 'edit',
              affix: true
            }
          }
        ]
      },
      {
        path: 'about',
        name: 'about',
        component: 'views/About.vue',
        meta: {
          title: '首页3546',
          icon: 'edit',
          affix: true,
          permissions:['test']
        }
      },
      {
        path: '401',
        name: '401',
        component: 'views/error-page/401.vue',
        meta: {
          title: '首678页6783',
          icon: 'edit',
          affix: true,
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
