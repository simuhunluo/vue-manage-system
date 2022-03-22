import request from '../utils/request'

/**
 * 查询转化目标配置列表.
 * @returns {*}
 */
export function getList(params) {
    return request({
        url: '/key-action-config/list',
        method: 'get',
        params
    })
}