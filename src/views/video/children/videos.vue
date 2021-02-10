<template>
  <div>
    <body>
      <BiaoQian :biaoQianName="biaoQianName" @nameChange="nameChange" />
      <VideoList :videoList="videoList" class="clearfix" />
      <Fenye :total="total" :pageSize="pageSize" @pageChange="currentChange" />
    </body>
  </div>
</template>

<script>
import Fenye from "components/fenye/fenye";

import BiaoQian from "components/video/biaoQian";
import VideoList from "components/video/videoList";
export default {
  data() {
    return {
      biaoQianName: [],
      ids: [],
      videoList: [],
      total: 66,
      pageSize: 6,
      //标签索引
      index: 0,
    };
  },
  components: {
    BiaoQian,
    VideoList,
    Fenye,
  },
  created() {
    //获取分类名字
    this.getbiaoQianName();
  },
  mounted() {},
  methods: {
    //获取分类名字
    async getbiaoQianName() {
      console.log("hehe");
      if (!window.localStorage.getItem("getP")) {
        return this.$message.error("未登录状态，不可访问！");
      }
      const res = await this.$http.get("/video/group/list");
      console.log(res);
      this.biaoQianName = [...res.data.data].splice(0, 11);
      this.biaoQianName.map((item) => {
        this.ids.push(item.id);
      });
      const res1 = await this.$http.get("video/group", {
        params: { id: this.ids[this.index] },
      });
      this.videoList = res1.data.datas.splice(0, 6);
    },
    //标签名字改变
    async nameChange(index) {
      this.index = index;
      const res1 = await this.$http.get("video/group", {
        params: { id: this.ids[this.index] },
      });
      this.videoList = res1.data.datas.splice(0, 6);
    },
    //获取标签改变
    async currentChange(page) {
      this.index = page - 1;
      console.log(page);
      const res1 = await this.$http.get("video/group", {
        params: { id: this.ids[this.index] },
      });
      this.videoList = res1.data.datas.splice(0, 6);
    },
  },
};
</script>

<style lang='less' scoped>
body {
  margin: 0 30px;
}
</style>