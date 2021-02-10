import vuex from 'vuex'
import vue from 'vue'

import mutations from './mutations'
import getters from './getters'

vue.use(vuex)

const state = {
  profile: '',
  showLogin: 'true',
  musicInfo: {},
  // 播放列表
  musiclistId: [],
  // 播放数量
  musicCount: 0,
  // 正在播放的歌曲
  nowMusic: '',
  // 音乐清单
  nowMusicMenu: [],
  //音乐url
  musicurl: '',
  //播放状态
  musicState: false,
  //正在播放的视频
  nowVideoInfo:{}
}



const actions = {}

const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store