import request from '@/utils/request'

export function addFirmware(params) {
  return request({
    url: '/admin/addDriver',
    method: 'post',
    params
  })
}

export function deleteFirmware(params) {
  return request({
    url: '/admin/deleteDriver',
    method: 'get',
    params
  })
}

export function getFirmwaresListByPageInfo(params) {
  return request({
    url: '/biz/getDriverListByPageInfo',
    method: 'get',
    params
  })
}

