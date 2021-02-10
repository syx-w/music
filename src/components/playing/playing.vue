<template>
  <!-- 正在播放页面 -->
  <div>
    <div class="maxBox" v-if="playNone.isShow">
      <div class="widthBox">
        <div class="kong"></div>
        <div
          class="bg_img"
          :style="{
            backgroundImage: 'url(' + this.musicInfo.al.picUrl + ')',
            filter: 'blur(100px)',
          }"
        ></div>
        <div class="playingBox">
          <div class="backBtn">
            <img
              @click="clickBack()"
              src="~assets/images/playMusic/收缩.png"
              alt=""
            />
          </div>
          <div class="leftTop">
            <div class="play_bar" ref="playBarRef">
              <img src="~assets/images/playMusic/player_bar.png" alt="" />
            </div>
            <div class="imgAndBtn">
              <div class="playingImg" ref="rotateRef">
                <img src="~assets/images/playMusic/disc.png" alt="" />
                <img :src="this.musicInfo.al.picUrl" alt="" />
              </div>
              <div class="btnBox">
                <el-button size="mini" icon="el-icon-circle-plus-outline"
                  >喜欢</el-button
                >
                <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
                <el-button size="mini" icon="el-icon-thumb">分享</el-button>
                <el-button size="mini" icon="el-icon-download"
                  >vip下载</el-button
                >
              </div>
            </div>
          </div>

          <div class="rightTop">
            <div class="contentBox">
              <div class="musicTitle nowp">
                <h4>
                  {{ musicInfo.name || musicInfo.al.name }}<span>标准音质</span>
                </h4>
              </div>
              <div class="singerName">
                <h6>
                  专辑:<a href="#">{{ musicInfo.al.name || musicInfo.name }}</a>
                </h6>
                <h6>
                  歌手:<a href="#">{{ musicInfo.name }}</a>
                </h6>
                <h6>
                  来源:<a href="#">
                    {{ musicInfo.name || musicInfo.al.name }}...</a
                  >
                </h6>
              </div>
              <div class="musicCi"></div>
            </div>
          </div>
          <div class="rightCenter test-1">
            <div
              class="ciItem"
              v-for="(item, index) in lrcObject"
              :key="'ci' + index"
            >
              {{ item.c }}
            </div>
          </div>
        </div>
        <div class="bottomBox">
          <div class="bottomLeft">
            <Comment :info="commentsInfo" />
          </div>
          <div class="bottomRight">
            <SeemMusics :info="simiInfo"></SeemMusics>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Comment from "./comment";
import SeemMusics from "./SeemMusics";
export default {
  data() {
    return {
      //旋转角度
      routeNum: 0,
      //歌曲信息
      musicInfo: {
        al: {
          picUrl: "",
        },
      },
      //清除
      timerId: "",
      //评论参数
      paramsCom: {
        id: "",
        limit: "",
      },
      //评论信息
      commentsInfo: [],
      //相似音乐信息
      simiInfo: [],
      //歌词信息
      lyrics: [],
      //歌词
      lrcObject: [], //t 时间 c 歌词
    };
  },
  props: {
    playNone: {
      type: Object,
      default: function () {
        return { isShow: true };
      },
    },
  },
  components: {
    Comment,
    SeemMusics,
  },
  created() {
    if (!this.$store.state.musicInfo) {
      return this.$router.push("/home/find/geXing");
    }
  },
  mounted() {
    //获取音乐信息
    this.getNowMusics();
    //获取音乐状态
    this.getMusicStates();
    //获取歌词
    this.getGeCi();
  },
  methods: {
    getNowMusics() {
      let info = this.$store.state.musicInfo;
      // console.log("我监听到了信息" + info);
      if (!info) return;
      clearInterval(this.timerId);
      this.$refs.playBarRef.style.transform = "rotateZ(-5deg)";
      this.timerId = setInterval(this.rotateAction, 30);
      this.musicInfo = info;
      this.paramsCom.id = info.id;
      this.getMusicComments(this.paramsCom);
      this.getSeemMusic();
    },
    getMusicStates() {
      let state = this.$store.state.musicState;
      // console.log("我监听到了" + state);
      if (state) {
        if (!state) return;
        clearInterval(this.timerId);
        this.$refs.playBarRef.style.transform = "rotateZ(-5deg)";
        this.timerId = setInterval(this.rotateAction, 30);
        this.getMusicComments(this.paramsCom);
        this.getSeemMusic();
      } else {
        this.$refs.playBarRef.style.transform = "rotateZ(-35deg)";
        clearInterval(this.timerId);
      }
    },
    //获取歌单评论
    async getMusicComments() {
      const res = await this.$http.get("comment/music", {
        params: this.paramsCom,
      });
      this.commentsInfo = res.data.hotComments;
    },
    //获取相似歌曲
    async getSeemMusic() {
      console.log("我要开始执行了！！");
      const res = await this.$http.get("simi/song", {
        params: { id: this.musicInfo.id },
      });
      this.simiInfo = res.data.songs;
      console.log(res);
      console.log("我执行完了！！");
    },
    //对话框收缩
    clickBack() {
      // this.playNone.isShow = false;
      this.$router.go(-1);
    },
    //唱片旋转
    rotateAction() {
      let rouRef = this.$refs.rotateRef;
      if (!rouRef) return;
      rouRef.style.transform = "rotateZ(" + this.routeNum + "deg)";
      this.routeNum += 1;
    },
    //获取歌词
    async getGeCi() {
      const res = await this.$http.get("lyric", {
        params: { id: this.musicInfo.id },
      });
      this.lyrics = res.data.lrc.lyric;
      this.changeGeCi(this.lyrics);
      console.log(res.data);
    },
    //解析歌词
    changeGeCi(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      let lrcs = lrc.split("\n");
      for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格  *表示可以不出现或者出现任意次 \s表示空格 ^表示开头 $表示结尾 /g表示匹配多个结果
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (var k in arr) {
          start = arr[k].length; //计算歌词位置 长度叠加
        }
        var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
        for (var k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          // var t = arr[k]
          var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
          oLRC.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            // t: t,
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3), //parseFloat 以数字返回该数字
            c: content === "" ? ".............." : content,
          });
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
      console.log(oLRC.ms);
      return (this.lrcObject = oLRC.ms);
    },
  },
  computed: {
    ...mapGetters(["getNowMusic", "getMusicState"]),
  },
  watch: {
    getNowMusic: function () {
      return this.getNowMusics();
    },
    getMusicState: function () {
      return this.getMusicStates();
    },
  },
};
</script>

<style lang='less' scoped>
.maxBox {
  width: 1000px;
  height: 850px;
}
.widthBox {
  position: relative;
  width: 870px;
  height: 100%;
  margin: 0 auto;
}
.bg_img {
  width: 800px;
  height: 400px;
  position: absolute;
  left: 100px;
  right: 0;
  z-index: 0;
  opacity: 0.7;
}
.kong {
  height: 35px;
  width: 100%;
  opacity: 1;
}
.playingBox {
  position: relative;
  width: 100%;
  height: 420px;
  // background-color: skyblue;
}
.backBtn {
  position: absolute;
  top: 0;
  right: -40px;
  width: 34px;
  height: 23px;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  cursor: pointer;
  img {
    position: relative;
    top: 1px;
    left: 6px;
    width: 22px;
    height: 22px;
  }
}
.leftTop {
  float: left;
  height: 100%;
  width: 440px;
  // background-color: #fff;
}
.play_bar {
  position: absolute;
  top: -50px;
  left: 150px;
  width: 100px;
  height: 130px;
  z-index: 999;
  transform: rotate(-5deg);
  transform-origin: left top;
  transition: all 1s ease;
  img {
    position: relative;
    top: -7px;
    left: -12px;
    width: 100%;
    height: 100%;
  }
}
.hehe {
  width: 100%;
  height: 200px;
  background-color: #fff;
}
.playingImg {
  position: relative;
  width: 320px;
  height: 320px;
  margin-top: 10px;
  :first-child {
    width: 100%;
  }
  :last-child {
    position: absolute;
    border-radius: 50%;
    top: 70px;
    left: 65px;
    width: 60%;
    z-index: 99;
  }
}
.btnBox {
  margin-top: 40px;
}
.rightTop {
  float: right;
  width: 428px;
  height: 20%;
  // background-color: skyblue;
}

.contentBox {
  width: 100%;
  height: 30px;
  h4 {
    font-size: 24px;
    span {
      padding: 2px 3px;
      font-size: 10px;
      color: red;
      border: 1px solid red;
      margin-left: 8px;
      position: relative;
      bottom: 3px;
    }
  }
}
.singerName {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

  h6 {
    font-weight: 400;
    font-size: 12px;
    a {
      color: #3a69b1;
      font-size: 12px;
    }
  }
}
.rightCenter {
  float: right;
  width: 428px;
  height: 80%;
  overflow: auto;
  line-height: 29px;
  font-size: 14px;
}
.bottomBox {
  margin-top: 20px;
}
.bottomLeft {
  float: left;
  width: 560px;
  height: auto;
  margin-bottom: 100px;
}
.bottomRight {
  float: right;
  width: 250px;
  // background-color: rgba(218, 198, 44, 0.5);
}

.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
</style>