import request from '@/utils/request'

export function fileUpload(data) {
  return request ({
    url: '/general/fileUpload',
    method: 'post',
    data
  })
}