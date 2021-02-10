<template>
  <!-- 首页-底部控制器 -->
  <div class="mainBoxBottom">
    <!-- 上一曲播放暂停下一曲 -->
    <div class="audioBtn">
      <div class="up">
        <a href="#" title="上一首">
          <img src="~assets/audio/上一首.png" alt="" />
        </a>
      </div>
      <div class="boFang" @click="switchAudio()">
        <el-tooltip class="item" effect="dark" content="播放" placement="top">
          <img src="~assets/audio/播放.png" v-if="!ifAudio" alt="" />
        </el-tooltip>

        <a href="#" title="暂停">
          <img src="~assets/audio/暂停.png" v-if="ifAudio" alt="" />
        </a>
      </div>
      <div class="down">
        <a href="#" title="下一首">
          <img src="~assets/audio/下一首.png" alt="" />
        </a>
      </div>
    </div>
    <!-- 时间线 -->
    <div class="audioLine">
      <span class="startTime">{{ musicDuration | filtersTime }}</span>
      <span class="endTime">{{ totalDuration | filtersTime }}</span>

      <el-slider
        v-model="musicDuration"
        :max="totalDuration"
        @change="musicDurationChange"
        :show-tooltip="false"
        :disabled="isUrl"
      >
      </el-slider>
    </div>
    <!-- 声音调节 -->
    <div class="singBox">
      <el-slider
        v-model="voiceAdjust"
        :max="maxVoice"
        @input="voiceChange"
      ></el-slider>
      <el-tooltip class="item" effect="dark" content="静音" placement="top">
        <img src="~assets/audio/声音.png" style="cursor: pointer" alt="" />
      </el-tooltip>
    </div>
    <!-- 列表循环歌词按钮 -->
    <div class="buttonBox">
      <el-tooltip class="item" effect="dark" content="列表循环" placement="top">
        <div class="xunHuan"><img src="~assets/audio/循环.png" alt="" /></div>
      </el-tooltip>

      <div class="biaoZhun"><span>标准</span></div>
      <div class="fenPei"><img src="~assets/audio/调节.png" alt="" /></div>
      <div class="geCi"><span>词</span></div>
      <div class="lieBiao">
        <img src="~assets/audio/列表.png" @click="clickListMusic()" alt="" />
      </div>
    </div>
    <!-- 列表 -->
    <div class="musicList test-1" v-if="listDialog">
      <el-table
        :data="listData"
        style="width: 100%"
        @row-click="playMusicList"
        stripe
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label=" " width="40px"> </el-table-column>
        <el-table-column prop="name" label="音乐标题" width="200px">
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" width="110px">
        </el-table-column>
        <el-table-column prop="dt" label="时长"> </el-table-column>
      </el-table>
    </div>
    <!-- 歌曲 -->
    <audio
      :src="this.musicUrl"
      class="playMusicAudio"
      ref="audioRef"
      autoplay
      id="musicAudio"
      loop="loop"
    ></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { songTimeFormat } from "common/tool";

import { getMusicUrl } from "network/children/geXing";
export default {
  data() {
    return {
      // getNowMusic: null,

      //是否显示暂停
      ifAudio: false,
      //当前进度
      musicDuration: 0,
      //最大值
      totalDuration: 0,
      //是否禁用
      isUrl: false,
      //音量调节
      voiceAdjust: 50,
      maxVoice: 100,
      //音乐信息
      musicInfo: {},
      //音乐url
      musicUrl: "",
      //列表对话框
      listDialog: false,
      //列表数据
      listData: [],
    };
  },
  created() {},
  mounted() {
    //初始化音乐
    this.installMusic();
    var audio = document.getElementById("musicAudio");
    audio.loop = false;
    console.log(audio.ended);
    //当多次调用this的时候最好换一下
    var self = this;
    //监听播放器是否播放完
    audio.addEventListener(
      "ended",
      function () {
        //获取当前索引
        var index = self.$store.state.musicInfo.index;
        //将下一首音乐信息传入store
        var musicInfo = self.$store.state.nowMusicMenu[index + 1];
        self.$store.commit("playMusicList", musicInfo);
        //获取url
        if (!musicInfo) return;
        getMusicUrl(musicInfo.id)
          .then((res) => {
            //将url传入store
            self.$store.commit("setMusicUrl", res.data[0].url);
          })
          .catch((err) => console.log(err));
      },
      true
    );
  },
  computed: {
    //音乐改变
    musicChange() {
      return this.$store.state.musicInfo;
    },
    ...mapGetters([
      "getNowMusic",
      "getMusicUrl",
      "getNowMusic",
      "getMusicListIds",
      "getNowMusicList",
    ]),
  },
  //改变进度触发事件
  methods: {
    //初始化音乐
    installMusic() {
      //获取音乐信息
      this.musicInfo = this.$store.state.musicInfo;
      const audio = this.$refs.audioRef;
      //初始化进度条时间
      audio.currentTime = this.musicDuration;
      console.log("123");
      console.log(this.$refs.audioRef.volume);
      //监听音频改变
      audio.addEventListener("timeupdate", () => {
        //获得音频长度
        this.totalDuration = audio.duration;
        //获取歌曲时间
        this.musicDuration = audio.currentTime;
      });
    },
    //进度条点击
    musicDurationChange(e) {
      this.$refs.audioRef.currentTime = e;
    },
    //播放暂停切换
    switchAudio() {
      if (this.ifAudio) {
        this.$refs.audioRef.pause();
        console.log("暂停了~");
      } else {
        this.$refs.audioRef.play();
        console.log("播放了~");
      }
      this.$store.commit("setMusicState");
      this.ifAudio = !this.ifAudio;
    },
    //声音调节改变
    voiceChange(e) {
      this.$refs.audioRef.volume = e / 100;
    },

    //列表点击
    clickListMusic() {
      this.listDialog = !this.listDialog;
    },
    //关闭点击
    handleClose(done) {
      console.log("关闭了");
      this.listDialog = false;
    },

    //点击某音乐之后播放
    playMusicList(e) {
      console.log(e.index);
      this.$store.commit("playMusicList", e);
      this.$store.commit("setMusicUrl");
      //获取该音乐url并上传到store
      getMusicUrl(e.id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data[0].url);
        })
        .catch((err) => console.log(err));
    },
    //获取每行索引
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
  },
  filters: {
    filtersTime(time) {
      return songTimeFormat(time);
    },
  },
  watch: {
    //监听得到musicList
    getNowMusicList: function () {
      console.log("我getNowMusicList了");

      this.listData = this.$store.state.nowMusicMenu;
    },
    //监听得到url
    getMusicUrl: function (url) {
      this.musicUrl = url;
      this.ifAudio = true;
    },
    //监听改变url
    getNowMusic: function () {
      this.musicUrl = this.$store.state.musicurl;
    },
  },
};
</script>

<style lang="less" scoped>
.mainBoxBottom {
  position: relative;
  background-color: #f6f6f8;
  div {
    float: left;
  }
}
.audioBtn {
  width: 200px;
  height: 50px;
  display: flex;
  flex-direction: initial;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.up,
.down {
  width: 30px;
  height: 30px;
  background-color: #e83c3c;
  border-radius: 15px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
}
.up {
  position: relative;
  left: 29px;
}
.down {
  position: relative;
  left: 80px;
}
.boFang {
  position: relative;
  left: 55px;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: #e83c3c;
  cursor: pointer;
  img {
    position: relative;
    left: 1px;
    top: 2px;
    width: 17px;
    height: 17px;
  }
}

.audioLine {
  position: relative;
  // float: left;
  height: 50px;
  width: 660px;
  .el-slider {
    margin-left: 49px;
    margin-top: 9px;
    width: 563px;
  }
}

.el-slider {
  /deep/ .el-slider__bar {
    height: 6px;
    background-color: #e83c3c;
  }
  /deep/ .el-slider__button {
    border: 1px solid #ccc;
    width: 12px;
    height: 12px;
  }
}
.startTime {
  position: absolute;
  top: 18px;
  left: 7px;
  font-size: 7px;
}
.endTime {
  position: absolute;
  top: 18px;
  right: 10px;
  font-size: 7px;
}

.singBox {
  width: 140px;
  height: 50px;
  .el-slider {
    margin-left: 31px;
    margin-top: 9px;
    width: 92px;
  }
  /deep/ .el-slider__button {
    display: none;
    border: 1px solid #ccc;
    width: 12px;
    height: 12px;
  }
  .el-slider:hover /deep/ .el-slider__button {
    display: inline-block;
  }
  img {
    float: left;
    position: relative;
    width: 20px;
    height: 20px;
    bottom: 30px;
    left: 5px;
  }
}
.buttonBox {
  width: 200px;
  height: 50px;
  div {
    margin-right: 18px;
    margin-top: 15px;
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
    span {
      cursor: pointer;
      position: relative;
      display: inline-block;
      top: -2px;
      padding: 0px 2px;
      border: 1px solid #666;
      font-size: 10px;
      color: #666;
    }
  }
}

.musicList {
  position: absolute;
  width: 410px;
  height: 400px;
  background-color: #fff;
  bottom: 2px;
  right: 10px;
  // border: 2px solid #ccc;
  box-shadow: 0 0 7px #888;

  overflow-x: hidden;
  overflow-y: scroll;
}

//列表样式
.el-tabs__content /deep/ .el-table td {
  padding: 6px;
}
thead {
  /deep/ .el-table th {
    padding: 0;
  }
  /deep/ .el-table td {
    padding: 0;
  }
}

.el-table /deep/ th,
td {
  padding: 3px;
  border-right: 1px solid var(--color-line);
  font-weight: 400;
  color: #000;
  font-size: 12px;
  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.el-table/deep/ td,
th {
  padding: 3px 0;
  font-size: 11px;
}
.el-table /deep/ td,
th.is-leaf {
  border: 0;
}
.el-table /deep/ .el-table__row {
  cursor: pointer;
}
tr /deep/ el-table__row:hover {
  color: #000;
}

.caoZuoBtn {
  width: 100%;
  height: 20px;
  img {
    cursor: pointer;
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    margin-left: 4px;
  }
  :nth-child(2) {
    top: 1px;
  }
  :nth-child(1) {
    left: -2px;
  }
}

.el-table--scrollable-x /deep/ .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>