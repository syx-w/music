import {
  request
} from '../request'
export function getAnchorType(typeid) {
  return request({
    url: '/dj/recommend/type',
    params: {
      type: typeid
    }
  })
}