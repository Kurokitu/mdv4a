import axios from 'axios'
// import router from './../router' 
const showStatus = (status) => {
    let message = ''
    switch (status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            break
        case 402:
            message = '拒绝访问(402)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            message = `连接出错(${status})!`
    }
    return `${message}`
}

const service = axios.create({
    // 联调

    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        post: {
            'Content-Type': 'application/json'
        }
    },
    // 是否跨站点访问控制请求
    withCredentials: false,
    timeout: 30000,
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    }
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    (err) => {
        err.message = '服务器异常'
        // 错误抛到业务代码
        return Promise.reject(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const status = response.status
        let msg = ''
        if (status < 200 || status >= 300 && status != 401 && status != 500) {
            // 处理http错误，抛到业务代码
            msg = showStatus(status)
            if (typeof response.data === 'string') {
                response.data = { msg }
            } else {
                response.data.msg = msg
            }
            return response
        } else if (status == 200) {
            return response
        } else if (status == 500) {
            msg = showStatus(status)
            response.data = { msg: msg }
            //router.replace({name:'exception',query:{type:500}})
            return response
        }

    },
    (err) => {
        err.message = '请求超时或服务器异常'
        return Promise.reject(err)
    }
)

export default service