<template>
  <body>
    <div class="bts">
      <div
        class="left"
        :class="isshow ? 'left active' : 'left '"
        @click="leftClick()"
      >
        新歌速递
      </div>
      <div
        class="right"
        :class="!isshow ? 'right active' : 'right '"
        @click="rightClick()"
      >
        新碟上架
      </div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      isshow: true,
    };
  },
  components: {},
  created() {
    this.isshow = window.localStorage.getItem("newSingbtn1");
  },
  mounted() {},
  methods: {
    leftClick() {
      this.isshow = true;
      window.localStorage.setItem("newSingbtn1", this.isshow);
      this.$emit("songsTabs", this.isshow);
    },
    rightClick() {
      this.isshow = false;
      window.localStorage.setItem("newSingbtn1", this.isshow);
      this.$emit("songsTabs", this.isshow);
    },
  },
};
</script>

<style lang='less' scoped>
body {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  .bts {
    width: 216px;
    height: 26px;
    display: flex;
    font-size: 12px;
    border-radius: 5px;
    color: #888;
    text-align: center;
    line-height: 26px;
    border: 1px solid #ccc;
    .left {
      width: 50%;
      height: 100%;
    }
    .right {
      width: 50%;
      height: 100%;
    }
  }
}
.active {
  color: #fff;
  background-color: #7c7d85;
}
</style>