<template>
  <div class="tuiJian">
    <h5>{{ headName }}</h5>
    <a href="#" v-if="show">更多></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // headName: "",
    };
  },
  props: {
    headName: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
.tuiJian {
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
  a {
    float: right;
    position: relative;
    top: 7px;
    right: 0;
    color: #000;
  }
}
</style>