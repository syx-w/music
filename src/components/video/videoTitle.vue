<template>
  <div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
    },
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang='less' scoped>
.title {
  width: 100%;
  border-bottom: 1px solid #777;
  font-size: 19px;
  height: 40px;
  line-height: 40px;
}
</style>