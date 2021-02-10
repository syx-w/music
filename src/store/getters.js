export default {
  // 个人信息
  profile(state) {
    return state.profile
  },
  // 登录窗口
  showLogin(state) {
    return state.showLogin
  },
  // 音乐
  getNowMusic(state) {
    if (state.musicInfo === null) state.musicInfo = ''
    return state.musicInfo
  },
  getMusicListIds() {
    return state.musiclistId
  },
  getMusicUrl(state) {
    return state.musicurl
  },
  //监听音乐列表
  getNowMusicList(state) {
    return state.nowMusicMenu
  },
  //音乐播放状态
  getMusicState(state) {
    return state.musicState
  },
  //视频播放信息
  getVideoInfo(state) {
    console.log('我监听得到了' + state.nowVideoInfo);
    console.log(state.nowVideoInfo);
  return state.nowVideoInfo
  }
}