// 导出地址
let baseURL
// process.env.NODE_ENV  获取当前node.js中的环境变量
switch (process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://dev-mall-pre.springboot.cn./api'
        break
    case 'test':
        baseURL = 'http://test-mall-pre.springboot.cn./api'
        break
    case 'prev':
        baseURL = 'http://prev-mall-pre.springboot.cn./api'
        break
    case 'prod':
        baseURL = 'http://prod-mall-pre.springboot.cn./api'
        break

    default:
        baseURL = 'http://mall-pre.springboot.cn/api'
        break
}

export default {
    baseURL
}