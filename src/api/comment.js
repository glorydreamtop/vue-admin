import request from '@/utils/request'

export function listComment(params) {
  return request({
    url: '/comment/list',
    method: 'get',
    params
  })
}

export function delComment(data) {
  return request({
    url: '/comment/del',
    method: 'post',
    data
  })
}
