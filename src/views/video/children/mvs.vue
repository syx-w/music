<template>
  <body>
    <header>
      <h4>最新MV</h4>
      <ul class="biaoQianItem">
        <li
          v-for="(item, index) in biaoQianName"
          :key="index"
          @click="clickName(index)"
          class="cur"
        >
          {{ item.name
          }}<span
            style="margin: 0 16px"
            v-if="index !== biaoQianName.length - 1"
            >|</span
          >
        </li>
      </ul>
      <!--  <span>内地 </span> | <span>港台 </span> | <span>欧美 </span> |
      <span>日本 </span> | <span> 韩国</span> -->
    </header>
    <Mv-list :videoList="videoList" class="clearfix" />
    <Fenye :total="total" :pageSize="pageSize" @pageChange="currentChange" />
  </body>
</template>

<script>
import { scrollAnimation } from "common/tool";

import Fenye from "components/fenye/fenye";

import MvList from "components/video/mvList";
export default {
  data() {
    return {
      //标签
      biaoQianName: [
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "日本" },
        { name: "韩国" },
      ],
      query: {
        area: "内地",
        limit: 36,
        offset: 0,
      },
      videoList: [],
      total: 66,
      pageSize: 6,
    };
  },
  components: {
    MvList,
    Fenye,
  },
  created() {
    //获取MV列表
    this.getMvList();
  },
  methods: {
    //获取MV列表
    async getMvList() {
      const res = await this.$http.get("/mv/all", { params: this.query });
      console.log(res.data);
      this.videoList = res.data.data;
    },
    //监听页面改变
    async currentChange(page) {
      this.query.offset = (page - 1) * this.query.limit;
      console.log(page);
      this.getMvList();
      //回到顶部
      let a = document.getElementById("Right_box").scrollHeight;
      scrollAnimation(a, 0);
    },
    //监听标签点击
    async clickName(page) {
      this.query.offset = page * this.query.limit;
      console.log(page + 1);
      this.getMvList();
      //回到顶部
      /* let a = document.getElementById("Right_box").scrollHeight;
      scrollAnimation(a, 0); */
    },
  },
};
</script>

<style lang='less' scoped>
body {
  margin: 0 30px;
}
header {
  line-height: 80px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  h4 {
    color: #000;
    display: inline-block;
    margin-right: 10px;
    font-size: 20px;
  }
  color: #888;
  /*  span {
    font-size: 12px;
    color: #888;
    cursor: pointer;
    margin: 0 3px;
  } */
  .biaoQianItem {
    display: inline-block;
    font-size: 12px;
    li {
      display: inline-block;
      cursor: pointer;
      color: #555;
    }
  }

  /*   span:active {
    color: #000;
  } */
  width: 100%;
  height: 60px;
}
</style>