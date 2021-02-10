<template>
  <div class="titleIcon">
    <div
      class="tt-item"
      v-for="(item, index) in cateList"
      :key="index"
      @click="handel(item.id)"
    >
      <div class="img">
        <img :src="item.picIPadUrl" alt="404" />
      </div>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      cateList: [],
    };
  },
  methods: {
    //获取电台分类
    async getAnchorCateList() {
      const res = await this.$http.post("dj/catelist");
      console.log(res);
      this.cateList = res.data.categories.splice(0, 6);
      console.log(this.cateList);
    },
    //点击跳转
    handel(id) {
      // console.log(id);
      this.$router.push("/anchor" + id);
    },
  },
  created() {
    this.getAnchorCateList();
  },
};
</script>

<style lang="less" scoped>
.titleIcon {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.tt-item {
  width: 16%;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  color: rgba(255, 0, 0, 0.7);
  margin: 0 50px;
  padding: 10px 0;
  p {
    white-space: nowrap;
  }
}
.tt-item:hover {
  background: #e8e8e8;
  color: red;
}
.img img {
  width: 35px;
  height: 35px;
}
</style>