<template>
  <!-- 发现音乐---个性推荐 -->
  <div>
    <!-- 轮播图 -->
    <swiper :banners="bannersInfo"></swiper>
    <!-- 推荐歌单 -->
    <div class="tuiJian">
      <h5>推荐歌单</h5>
      <span class="cur" @click="routerPush">更多></span>
    </div>
    <div class="musicImgBox">
      <music-img :musiclists="musicList"></music-img>
    </div>
  </div>
</template>

<script>
// 轮播图
import swiper from "components/find/swiper";
import musicImg from "common/musicImg";
export default {
  components: {
    swiper,
    musicImg,
  },
  data() {
    return {
      musicList: [],
      bannersInfo: [],
    };
  },
  created() {
    this.getBiaoName();
    this.getSwiter();
  },
  methods: {
    //获取音乐图片
    async getBiaoName() {
      const res = await this.$http.post("top/playlist", this.cateListProm);
      this.musicList = res.data.playlists;
    },
    //获取轮播图
    async getSwiter() {
      const res = await this.$http.post("banner");
      this.bannersInfo = res.data.banners;
    },
    //下拉加载更多
    getMore() {},
    //路由跳转
    routerPush() {
      console.log("heh");
      this.$router.push("/home/find/songList");
    },
  },
  computed: {},
};
</script>


<style lang="less" scoped>
.tuiJian {
  position: relative;
  bottom: 38px;
  height: 33px;
  width: 100%;
  border-bottom: 1px solid #e1e1e2;
  float: left;
  // background-color: red;
  h5 {
    float: left;
    font-size: 18px;
    font-weight: 400;
  }
  span {
    float: right;
    position: relative;
    font-size: 14px;
    top: 7px;
    right: 0;
    color: #000;
  }
}
.musicImgBox {
  position: relative;
  top: -26px;
}
</style>