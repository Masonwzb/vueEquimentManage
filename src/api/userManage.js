import request from '@/utils/request'

//
export function getList(params) {
  return request({
    url: '/biz/getUserListByPageInfo',
    method: 'get',
    params
  })
}
