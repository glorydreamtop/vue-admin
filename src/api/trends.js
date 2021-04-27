import request from '@/utils/request'

export function listTrends(params) {
  return request({
    url: '/trends/list',
    method: 'get',
    params
  })
}

export function addTrends(data) {
  return request({
    url: '/trends/add',
    method: 'post',
    data
  })
}

export function delTrends(data) {
  return request({
    url: '/trends/del',
    method: 'post',
    data
  })
}
