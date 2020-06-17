const tokens = {
  admin: "admin-accessToken",
  editor: "editor-accessToken",
  test: "test-accessToken",
};

export default [
  {
    url: 'mock/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body;
      const token = tokens[username];

      if (!token) {
        return {
          code: 400,
          data: null,
          msg: '账号或密码错误'
        }
      }

      return {
        code: 200,
        data: {
          token: token,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
          role: 'admin'
        },
        msg: '登陆成功'
      }
    }
  }
]
