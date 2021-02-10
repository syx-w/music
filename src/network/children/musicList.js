import {
  request
} from '../request'
//歌曲列表
export function getTopPlayList(limit, offset, cat) {
  return request({
    url: "top/playlist",
    params: {
      limit: limit,
      offset: offset,
      cat: cat
    },
  });
}