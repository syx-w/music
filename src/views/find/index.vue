<template>
  <div>
    <div class="maxBox" ref="right_Box_Ref" id="right_box">
      <div class="topBar">
        <tap-bar />
      </div>
      <transition :name="transitionName">
        <!-- <keep-alive exclude="bestNew,geXing,paiHang,singer,songList,zhuBo"> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>

<script>
import tapBar from "components/find/tapBar";

export default {
  data() {
    return {
      transitionName: "",
    };
  },
  components: {
    tapBar,
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      }
      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      }
    },
  },
};
</script>

<style scoped>
.maxBox {
  width: 940px;
  margin: 0 auto;
  height: 800px;
  /* background-color: #fff; */
}
.topBar {
  width: 940px;
  height: 50px;
}
</style>