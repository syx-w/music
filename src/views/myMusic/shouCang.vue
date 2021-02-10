<template>
  <div>
    <div class="twoBox">
      <div class="pic"></div>
      <div class="pic"></div>
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
.twoBox {
  width: 400px;
  height: 400px;
  background-color: red;
  display: flex;
  justify-content: space-between;

  .pic {
    width: 20px;
    height: 20px;
    background-color: blue;
  }
  .pic:nth-child(2) {
    align-self: flex-end;
  }
}
</style>