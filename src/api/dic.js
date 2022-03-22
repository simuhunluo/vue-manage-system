import request from '../utils/request'

/**
 * 获取app列表.
 * @returns {*}
 */
export function getApps() {
    return request({
        url: '/app-channel/appList',
        method: 'get'
    })
}

/**
 * 获取渠道列表.
 * @returns {*}
 */
export function getChannels() {
    return request({
        url: '/app-channel/channelList',
        method: 'get'
    })
}

/**
 * 查询字典表
 * @param params {"type":"key-action"}
 * @returns {*}
 */
export function getDics(params) {
    return request({
        url: '/dic/query',
        method: 'get',
        params
    })
}
