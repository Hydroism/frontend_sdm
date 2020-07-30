## 项目简介
[frontend_sdm](https://github.com/Hydroism/frontend_sdm)是一个基于[vue-element-admin](https://panjiachen.github.io/vue-element-admin)为基础模板的角色权限管理系统。以TypeScript重构，集成了一套完整的角色权限管理方案，包括角色的动态路由，角色的权限设置。动态路由控制主要通过vue-router中的addRoutes来实现，角色权限控制则通过角色权限码与功能权限码的位运算进行权限校验。

## 开发
```
# 克隆项目
git clone https://github.com/Hydroism/frontend_sdm.git

# 进入项目
cd frontend_sdm

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:3001
