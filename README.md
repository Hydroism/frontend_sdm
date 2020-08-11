## 项目简介
[frontend_sdm](https://github.com/Hydroism/frontend_sdm)是一个基于[vue-element-admin](https://panjiachen.github.io/vue-element-admin)为基础模板的角色权限管理系统。以TypeScript重构，集成了一套完整的角色权限管理方案，包括角色的动态路由，角色的权限设置。动态路由控制主要通过vue-router中的addRoutes来实现，角色权限控制则通过角色权限码与功能权限码的位运算进行权限校验。

## 权限介绍
传统的权限系统里，存在很多关联关系，如用户和权限的关联，用户和角色的关联。系统越大，关联关系越多，越难以维护。而引入位运算，将角色与权限进行解耦，可以巧妙的解决该问题。

举个例子，这里有三个权限增、删、查，对应的权限码为1、2、4，也就是`2^n`来表示，二进制的每一个位，代表一个权限。角色的权限码user

|权限|字母表示|数字表示|二进制|
|---|---|---|---|
|增|a|1|0b001|
|删|d|2|0b010|
|查|r|4|0b100|

### 添加权限
```javascript
let user = 0
let a = 0b001
let d = 0b010
let r = 0b100

//赋值给user增删改a、d、r三个权限
user = user | a | d | r

console.log(user)
// 7
```
user由原本的0b000，三个位都是0，即三个权限都是空，经过`按位或运算|`后变成0b111三个位都是1，即拥有该三个权限。

### 检验权限
```javascript
let user = 0
let a = 0b001
let d = 0b010
let r = 0b100

//赋予增a，查r两个权限
user = user | a | r
// 5 (0b101)

console.log((user & a) === a) //true 有 增a 权限
console.log((user & d) === d) //false 无 删d 权限
console.log((user & r) === r) //true 有 查r 权限
```
user通过`按位与运算&`后与权限的比较，就可以判断出用户是否拥有该权限。

### 删除权限
```javascript
let user = 0b101 //拥有增a，查r两个权限
let a = 0b001
let d = 0b010
let r = 0b100

//删除 增a 的权限
user = user & (~a)

console.log((user & a) === a) //false 无 增a 权限
console.log((user & d) === d) //false 无 删d 权限
console.log((user & r) === r) //true 有 查r 权限

console.log(user.toString(2)) //现在 user 是 0b100
```

### 局限性和解决方法
上述介绍仅为位运算的权限管理的原理部分，在实际运用中，由于权限的数量比较多，权限使用`2^n`是指数型的增长，容易超出JavaScript的数字操作范围-(2^53-1) ~ 2^53-1之间，JavaScript 的按位操作符又是将其操作数当作 32 位比特序列的。所以对位运算只能在2^32范围内，即只有32个权限可用。

为了突破这个问题，新的解决方案便是引进一个`权限空间`的概念。多开辟几个空间来存放这些权限。

1. 权限code：`index,pos`的字符串格式。index表示权限空间，pos表示二进制中权限1的位置(如同上文2^pos)。每一个新的全新pos+1，每当pos加到32时，index+1，pos从0开始。

2. 用户权限：如同`1, 16, 16`的字符串格式。英文逗号分隔开，每一个位置代表权限空间(如1在第0位，代表权限空间0的权限码为1)

```javascript
// 用户的权限 code
let userCode = ""

// 假设系统里有这些权限
// 纯模拟，正常情况下是按顺序的，如 0,0 0,1 0,2 ...，尽可能占满一个权限空间，再使用下一个
const permissions = {
  SYS_SETTING: {
    value: "0,0",   // index = 0, pos = 0
    info: "系统权限"
  },
  DATA_ADMIN: {
    value: "0,8",
    info: "数据库权限"
  },
  USER_ADD: {
    value: "0,22",
    info: "用户新增权限"
  },
  USER_EDIT: {
    value: "0,30",
    info: "用户编辑权限"
  },
  USER_VIEW: {
    value: "1,2",   // index = 1, pos = 2
    info: "用户查看权限"
  },
  USER_DELETE: {
    value: "1,17",
    info: "用户删除权限"
  },
  POST_ADD: {
    value: "1,28",
    info: "文章新增权限"
  },
  POST_EDIT: {
    value: "2,4",
    info: "文章编辑权限"
  },
  POST_VIEW: {
    value: "2,19",
    info: "文章查看权限"
  },
  POST_DELETE: {
    value: "2,26",
    info: "文章删除权限"
  }
}

// 添加权限
const addPermission = (userCode, permission) => {
  const userPermission = userCode ? userCode.split(",") : []
  const [index, pos] = permission.value.split(",")

  userPermission[index] = (userPermission[index] || 0) | Math.pow(2, pos)

  return userPermission.join(",")
}

// 删除权限
const delPermission = (userCode, permission) => {
  const userPermission = userCode ? userCode.split(",") : []
  const [index, pos] = permission.value.split(",")

  userPermission[index] = (userPermission[index] || 0) & (~Math.pow(2, pos))

  return userPermission.join(",")
}

// 判断是否有权限
const hasPermission = (userCode, permission) => {
  const userPermission = userCode ? userCode.split(",") : []
  const [index, pos] = permission.value.split(",")
  const permissionValue = Math.pow(2, pos)

  return (userPermission[index] & permissionValue) === permissionValue
}

// 列出用户拥有的全部权限
const listPermission = userCode => {
  const results = []

  if (!userCode) {
    return results
  }

  Object.values(permissions).forEach(permission => {
    if (hasPermission(userCode, permission)) {
      results.push(permission.info)
    }
  })

  return results
}

const log = () => {
  console.log(`userCode: ${JSON.stringify(userCode, null, " ")}`)
  console.log(`权限列表: ${listPermission(userCode).join("; ")}`)
  console.log("")
}

userCode = addPermission(userCode, permissions.SYS_SETTING)
log()
// userCode: "1"
// 权限列表: 系统权限

userCode = addPermission(userCode, permissions.POST_EDIT)
log()
// userCode: "1,,16"
// 权限列表: 系统权限; 文章编辑权限

userCode = addPermission(userCode, permissions.USER_EDIT)
log()
// userCode: "1073741825,,16"
// 权限列表: 系统权限; 用户编辑权限; 文章编辑权限

userCode = addPermission(userCode, permissions.USER_DELETE)
log()
// userCode: "1073741825,131072,16"
// 权限列表: 系统权限; 用户编辑权限; 用户删除权限; 文章编辑权限

userCode = delPermission(userCode, permissions.USER_EDIT)
log()
// userCode: "1,131072,16"
// 权限列表: 系统权限; 用户删除权限; 文章编辑权限

userCode = delPermission(userCode, permissions.USER_EDIT)
log()
// userCode: "1,131072,16"
// 权限列表: 系统权限; 用户删除权限; 文章编辑权限

userCode = delPermission(userCode, permissions.USER_DELETE)
userCode = delPermission(userCode, permissions.SYS_SETTING)
userCode = delPermission(userCode, permissions.POST_EDIT)
log()
// userCode: "0,0,0"
// 权限列表: 

userCode = addPermission(userCode, permissions.SYS_SETTING)
log()
// userCode: "1,0,0"
// 权限列表: 系统权限
```
除了通过引入权限空间的概念突破二进制运算的位数限制，还可以使用 math.js 的 bignumber，直接运算超过 32 位的二进制数。

## 权限的应用


## 开发
```
# 克隆项目
git clone https://github.com/Hydroism/frontend_sdm.git

# 进入项目
cd frontend_sdm

# 安装依赖(npm^6.12.1)
# npm版本过低会安装失败
# npm install -g npm 升级最新版本
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:3001
