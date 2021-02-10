<template>
  <div class="itemBox">
    <div class="imgBox"><img :src="imgSrc" alt="" /></div>
    <div class="nameText">{{ nameText }}</div>
    <div class="textBox">
      <h5>{{ textContent }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    imgSrc: {
      type: String,
      default: "",
    },
    textContent: {
      type: String,
      default: "",
    },
    nameText: {
      type: String,
      default: "",
    },
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
.itemBox {
  float: left;
  position: relative;
  margin-top: 10px;
  margin-right: 14px;
  width: 145px;
  height: 185px;
  img {
    width: 100%;
  }
  .nameText {
    position: absolute;
    margin-left: 10px;
    left: 0;
    bottom: 40px;
    color: #fff;
    font-size: 13px;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.textBox {
  margin-top: 5px;
  h5 {
    font-weight: 400;
    font-size: 14px;
  }
}
</style>