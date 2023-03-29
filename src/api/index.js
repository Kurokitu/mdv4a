import axios from './axios'

// 业务Api请求封装

const baseApiUrl = config.AQUA_URL + '/api'
const baseApiUrl2 = baseApiUrl + '/game/maimai2'

export const QueryAimeId = (accessCode) => axios({
    url: baseApiUrl + '/sega/aime/getByAccessCode',
    method: 'POST',
    data: {
        accessCode
    }
})

export const GetUserProfile = (params) => axios({
    url: baseApiUrl2 + '/profile',
    method: 'GET',
    params
})

export const GetUserRecent = (params) => axios({
    url: baseApiUrl2 + '/recent',
    method: 'GET',
    params
})