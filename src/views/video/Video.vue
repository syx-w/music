<template>
  <div>
    <TapBar />
    <router-view class="lu"></router-view>
  </div>
</template>

<script>
import TapBar from "components/video/tapBar";

export default {
  data() {
    return {};
  },
  components: {
    TapBar,
  },
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
.lu {
  overflow: hidden;
}
</style>