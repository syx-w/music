export default {
  // 上传个人信息
  getProfile(state, profile) {
    console.log(profile)
    state.profile = profile
  },
  // 上传是否显示登录
  getLogin(state, showLogin) {
    state.showLogin = showLogin
  },
  // 正在播放的音乐信息
  playMusicList(state, musicInfo) {
    console.log(state.musicInfo);
    console.log(musicInfo);
    state.musicInfo = musicInfo
  },
  // 播放音乐列表
  getMusiclistIds(state, list) {
    state.musiclistId = [...list]
  },
  // 播放列表清零
  clearMusicList(state) {
    if (state.musiclistId.length > 0) {
      state.musicCount = 0
    }
  },
  // 正在播放的音乐
  getNowMusic(state, url) {
    state.nowMusic = ''
    state.nowMusic = url
  },
  //
  clearNowMusic(state) {
    state.nowMusic = ''
  },
  // 获取清单
  getNowMusicMenu(state, list) {
    state.nowMusicMenu = [...list]
  },
  //音乐地址
  setMusicUrl(state, url) {
    state.musicurl = url
    state.musicState = true
    console.log('我设置了播放状态为：'+state.musicState);
  },
  //播放状态
  setMusicState(state) {
    state.musicState = !state.musicState
    console.log('我设置了播放状态'+state.musicState);
  },
  //正在播放的视频
  setVideoInfo(state, info) {
    state.nowVideoInfo = info
    console.log('我设置了播放的视频'+info);
  }
}