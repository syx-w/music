import {
  request
} from '../request'
//获取歌手分类
export function getSingersList(letter, type, area,limit ) {
  return request({
    url: 'artist/list',
    params: {
      
       letter,
       type,
     area,
      limit
    },
  });

}
/* export function getSingersList(con) {
  return request({
    url: 'search',
    params: {
      keywords: con
    }
  })
} */