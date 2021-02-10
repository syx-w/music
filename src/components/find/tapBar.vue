<template>
  <div class="maxBox">
    <div class="Box">
      <el-menu
        default-active="geXing"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item
          index="geXing"
          @click="saveTopState('/find/geXing')"
          :class="activePath == '/find/geXing' ? 'activeBg' : ''"
          ><span>个性推荐</span></el-menu-item
        >
        <el-menu-item
          index="songList"
          @click="saveTopState('/find/songList')"
          :class="activePath == '/find/songList' ? 'activeBg' : ''"
          ><span>歌单</span></el-menu-item
        >
        <el-menu-item
          index="zhuBo"
          @click="saveTopState('/find/zhuBo')"
          :class="activePath == '/find/zhuBo' ? 'activeBg' : ''"
          ><span>主播电台</span></el-menu-item
        >
        <el-menu-item
          index="paiHang"
          @click="saveTopState('/paiHang')"
          :class="activePath == '/paiHang' ? 'activeBg' : ''"
          ><span>排行榜</span></el-menu-item
        >
        <el-menu-item
          index="singer"
          @click="saveTopState('/singer')"
          :class="activePath == '/singer' ? 'activeBg' : ''"
          ><span>歌手</span></el-menu-item
        >
        <el-menu-item
          index="bestNew"
          @click="saveTopState('/bestNew')"
          :class="activePath == '/bestNew' ? 'activeBg' : ''"
          ><span>最新音乐</span></el-menu-item
        >
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //活跃路径
      activePath: "",
      //活跃索引
      activeIndex: "/geXing",
    };
  },
  created() {
    this.getSaveTopState();
  },
  methods: {
    //获取索引状态
    getSaveTopState() {
      this.activeIndex = window.sessionStorage.getItem("saveTopState");
    },

    saveTopState(state) {
      window.sessionStorage.setItem("saveTopState", state);
      this.activePath = state;
    },
    handleSelect(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="less" scoped>
.Box {
  width: 100%;
  height: 50px;
  /* background-color: #fff; */
  border-bottom: 1px solid #e1e1e2;
}
.Box /deep/ .el-menu {
  // background-color: rgba(0, 0, 0, 0.1);
}
.el-menu-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50px;
  width: 500px;
  margin: 0 auto;
}
.el-menu-item {
  flex: 1;
  height: 50px;
  width: 60px;
  padding: 0;
  text-align: center;
  color: #000;
  font-size: 15px;
  line-height: 50px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #c62f2f;
  color: #c62f2f;
  font-size: 15px;
  // background-color: rgba(0, 0, 0, 0.1);
}
</style>