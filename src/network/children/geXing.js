import {
  request
} from '../request'
//歌曲列表
export function getSongListInfoSongs(songsid) {
  return request({
    url: "song/detail",
    params: {
      ids: songsid,
    },
  });
}
//获取歌单详情
export function getListDetail(id) {
  return request({
    url: "playlist/detail",
    params: {
      id: id,
    },
  });
}
// 获取歌单地址
export function getMusicUrl(id) {
  return request({
    url: "song/url",
    params: {
      id: id,
    },
  });
}