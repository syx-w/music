<template >
  <body class="test-2" id="leftId">
    <div class="btnBox">
      <button @click="start">开始</button>
      <button @click="end">结束</button>
      <button @click="hidden">关闭</button>
      <button @click="showClick">显示</button>
    </div>
    <div v-if="show">
      <List-item :info="item" v-for="(item, index) in this.info" :key="index" />
    </div>
  </body>
</template>

<script>
import ListItem from "./listItem";
import { scrollAuto } from "common/tool";
export default {
  data() {
    return {
      info: [],
      setTime: null,
      show: true,
    };
  },
  components: {
    ListItem,
  },
  created() {
    this.getCommentList();
    this.start();
  },
  methods: {
    async getCommentList() {
      const res = await this.$http.get("comment/hotwall/list");
      console.log(res.data.data);
      this.info = res.data.data;
    },
    //开始滚动
    start() {
      //计算长度
      this.setTime = setInterval(function () {
        let a = document.getElementById("leftId").scrollHeight;
        let b = document.getElementById("leftId").clientHeight;
        let c = document.getElementById("leftId").scrollTop;
        if (a - b === c) {
          document.getElementById("leftId").scroll(a, 0);
        }
        document.getElementById("leftId").scrollBy(0, 1);
      }, 50);
    },
    //结束滚动
    end() {
      clearInterval(this.setTime);
      // scrollAuto();
    },
    //隐藏
    hidden() {
      document.getElementById("left_Box").style.display = "none";
      this.show = false;
    },
    //显示
    showClick() {
      this.show = true;
    },
  },
};
</script>

<style lang='less' scoped>
body {
  // position: relative;
  max-height: 950px;
  overflow: auto;
  width: 337px;
  padding-right: 12px;
  margin: 4px;
}
.btnBox {
  position: fixed;
  left: 0px;
  bottom: 0;
  z-index: 999;
}
</style>