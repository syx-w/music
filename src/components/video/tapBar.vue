<template>
  <div class="maxBox">
    <div class="Box">
      <el-menu
        default-active="/home/video/videos"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item
          index="/home/video/videos"
          @click="saveTopState('/video/videos')"
          :class="activePath == '/video/videos' ? 'activeBg' : ''"
          ><span>视频</span></el-menu-item
        >
        <el-menu-item
          index="/home/video/mvs"
          @click="saveTopState('/video/mvs')"
          :class="activePath == '/video/mvs' ? 'activeBg' : ''"
          ><span>MV</span></el-menu-item
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
      activePath: "/video/videos",
      //活跃索引
      activeIndex: "/home/video/videos",
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
  height: 50px;
  margin: 0 30px;
  border-bottom: 1px solid #e1e1e2;
}
.Box /deep/ .el-menu {
  background-color: rgba(0, 0, 0, 0.1);
}
.el-menu-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50px;
  width: 200px;
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
  background-color: rgba(0, 0, 0, 0.1);
}
</style>