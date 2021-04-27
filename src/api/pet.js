import request from '@/utils/request'

export function listComment(params) {
  return request({
    url: '/pet/all',
    method: 'get',
    params
  })
}

export function delComment(data) {
  return request({
    url: '/pet/del',
    method: 'post',
    data
  })
}
