<template>
  <div>
    <div class="maxBox">
      <div class="a"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
.maxBox {
  .a {
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 100px;
    border-color: transparent red transparent transparent;
    border-style: solid;
    transform: rotate(90deg);
  }
}
</style>