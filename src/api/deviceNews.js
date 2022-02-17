import request from '@/utils/request'

export function addNews(params) {
  return request({
    url: '/admin/addNews',
    method: 'post',
    params
  })
}

export function updateNews(params) {
  return request({
    url: '/admin/updateNews',
    method: 'post',
    params
  })
}

export function deleteNews(params) {
  return request({
    url: '/admin/deleteNews',
    method: 'get',
    params
  })
}

export function getNewsListByPageInfo(params) {
  return request({
    url: '/biz/getNewsListByPageInfo',
    method: 'get',
    params
  })
}

