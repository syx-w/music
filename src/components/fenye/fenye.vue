<template>
  <div class="fenye">
    <div class="block">
      <el-pagination
        layout="prev, pager, next,total"
        :total="total"
        :page-size="pageSize"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["total", "pageSize"],
  components: {},
  created() {},
  methods: {
    /*  upPage(p) {
      console.log(p);
    },
    downPage(p) {
      console.log(p);
    }, */
    pageChange(page) {
      this.$emit("pageChange", page);
    },
  },
};
</script>

<style lang='less' scoped>
.fenye {
  width: 100%;
  height: 50px;
  margin: 40px auto;
}
.block {
  margin: 0 auto;
  text-align: center;
}
.block /deep/ span {
  color: #fff;
}
.block /deep/ li {
  background-color: rgba(0, 0, 0, 0);
}
.block /deep/ .btn-next {
  background-color: rgba(0, 0, 0, 0);
}
.block /deep/ .btn-prev {
  background-color: rgba(0, 0, 0, 0);
}
</style>