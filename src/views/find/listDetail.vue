<template>
  <div class="maxBox1">
    <div class="topBox">
      <div class="mainBox">
        <div class="imgBox">
          <img :src="musicList.coverImgUrl" alt="" />
        </div>
        <div class="desc">
          <div class="title">
            <span>歌单</span>
            <h3>{{ musicList.name }}</h3>
          </div>
          <div class="logoTime">
            <img :src="musicList.creator.avatarUrl" alt="未找到" />
            <a class="d" href="#">{{ musicList.creator.nickname }}</a>
            <span class="d">{{ musicList.createTime | showData }}创建</span>
            <div class="start">
              <img src="~assets/images/geXing/星星.png" alt="" />
            </div>
          </div>
          <div class="btnList" @click="playAll()">
            <div class="playAll d">
              <i class="el-icon-video-play" />播放全部<i class="el-icon-plus" />
            </div>
            <div class="shouCang d">收藏({{ musicList.subscribedCount }})</div>
            <div class="share d">分享({{ musicList.shareCount }})</div>
            <div class="downAll d">下载全部</div>
          </div>
          <div class="bottomText">
            <span
              >标签:
              <a
                href="#"
                v-for="(item, index) in musicList.tags"
                :key="index"
                >{{
                  index + 1 === musicList.tags.length ? item : item + " / "
                }}</a
              ></span
            >
            <div>
              {{ (musicList.description + "").substr(0, 200) + "..." }}
            </div>
          </div>
          <div class="count">
            <div>歌曲数{{ musicList.trackCount }}</div>
            <div>播放数{{ (musicList.playCount / 10000).toFixed(0) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="歌曲列表" name="first"
            ><song-lists ref="songListsRef"></song-lists
          ></el-tab-pane>
          <el-tab-pane label="评论(999)" name="second"
            ><critic></critic
          ></el-tab-pane>
          <el-tab-pane label="收藏者" name="third"
            ><shou-cang></shou-cang
          ></el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>


<script>
import songLists from "components/find/listDetail/songLists";
import shouCang from "components/find/listDetail/shouCang";
import critic from "components/find/listDetail/critic";

import { getListDetail, getMusicUrl } from "network/children/geXing";

import { formatDate } from "common/tool";
export default {
  data() {
    return {
      //id
      id: 0,
      //顶部资料
      musicList: { creator: { avatarUrl: "www.baidu.com" } },
      activeName: "first",
    };
  },
  components: { songLists, shouCang, critic },
  created() {
    this.getMusicList();
  },
  mounted() {},
  methods: {
    //获取列表
    getMusicList() {
      const id = this.$route.params.id;
      if (!id) return;
      getListDetail(id)
        .then((res) => {
          this.musicList = res.playlist;
        })
        .catch((err) => console.log(err));
    },
    //切换栏
    handleClick(vel) {
      console.log(vel);
    },
    //将全部歌曲添加到列表
    playAll() {
      //取消循环播放
      var audio = document.getElementById("musicAudio");
      audio.loop = false;
      //通过refs的形式将子组件传入父组件
      console.log(this.$refs.songListsRef.tableData);
      this.$store.commit("getNowMusicMenu", this.$refs.songListsRef.tableData);
      if (!this.$store.state.nowMusicMenu[0].id) return;
      this.$store.commit("playMusicList", this.$store.state.nowMusicMenu[0]);
      //获取第一条音乐url并上传到store
      getMusicUrl(this.$store.state.nowMusicMenu[0].id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data[0].url);
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    //监听路由变化
    $route: function (to, from) {
      return this.getMusicList();
    },
  },
  filters: {
    showData: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style lang="less" scoped>
.topBox {
  // background-color: red;
  width: 100%;
  height: 250px;
}

.mainBox {
  // background-color: blue;
  width: 940px;
  height: 200px;
  margin: 0 auto;
  margin-top: 30px;
}

.imgBox {
  float: left;
  height: 200px;
  width: 200px;
  background-color: pink;
  img {
    width: 100%;
  }
}

.desc {
  position: relative;
  display: inline-block;
  width: 710px;
  margin-left: 30px;
  height: 100%;
  // background-color: skyblue;
}
.bottomBox {
  width: 100%;
  float: left;
  overflow: auto;
}

.el-tabs /deep/ .el-tabs__nav {
  margin-left: 70px;
}
.el-tabs /deep/ .el-tabs__active-bar {
  background-color: #c62f2f;
  height: 4px;
}
.el-tabs /deep/ .el-tabs__item.is-active {
  color: #c62f2f;
}
.el-tabs /deep/ .el-tabs__nav-wrap::after {
  height: 1px;
  color: var(--color-line);
}
.el-tabs /deep/ .el-tabs__header {
  margin: 0;
}
.title {
  // margin-top: 4px;
  height: 30px;
  span {
    display: inline-block;
    width: 35px;
    height: 18px;
    border: 1px solid red;
    color: red;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    margin-right: 14px;
  }
  h3 {
    position: relative;
    top: 4px;
    display: inline-block;
    font-size: 20px;
    font-weight: 400;
  }
}

.logoTime {
  position: relative;
  height: 32px;
  margin-top: 10px;
  // text-align: center;
  line-height: 32px;
  img {
    position: relative;
    bottom: 4px;
    height: 34px;
    width: 34px;
    border-radius: 50%;
    vertical-align: middle;
  }
  a {
    height: 32px;
    color: #000;
    margin-left: 6px;
    margin-right: 16px;
    font-size: 15px;
  }
  span {
    height: 32px;
    font-size: 11px;
    color: #999;
  }
}
.start {
  position: absolute;
  top: 21px;
  left: 23px;
  width: 10px;
  height: 10px;
  background-color: #ffbd20;
  border-radius: 50%;
  img {
    position: relative;
    bottom: 13px;
    // background-color: red;
    width: 10px;
    height: 10px;
  }
}

.playAll {
  margin-top: 14px;
  width: 120px;
  height: 25px;
  background-color: #c62f2f;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  line-height: 26px;
  i {
    color: #fff;
    margin: 0 5px;
  }
}
.btnList {
  font-size: 14px;
}
.bottomText {
  margin-top: 25px;
  font-size: 12px;
  div {
    margin-top: 16px;
  }
}
.count {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 13px;
  color: #444;
}
.shouCang,
.share,
.downAll {
  padding: 4px 5px;
  border: 1px solid var(--color-line);
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
}
</style>