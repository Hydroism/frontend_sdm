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
  }
]
