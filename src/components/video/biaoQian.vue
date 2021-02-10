<template>
  <div>
    <div class="allList">
      <el-dropdown size="medium" trigger="click">
        <span class="el-dropdown-link" style="color: #000">
          全部视频<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="position: relative; top: -20px"
        >
          <!-- <el-dropdown-item v-for="(item, index) in cateageName" :key="index">{{
            item.name
          }}</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="biaoQian">
      <span style="margin-right: 14px">分类:</span>
      <ul class="biaoQianItem">
        <li
          v-for="(item, index) in biaoQianName"
          :key="index"
          @click="clickName(item.name, index)"
          class="cur"
        >
          {{ item.name
          }}<span
            style="margin: 0 16px"
            v-if="index !== biaoQianName.length - 1"
            >|</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    biaoQianName: {
      type: Array,
    },
  },
  components: {},
  created() {},
  methods: {
    //遍历id
    getIdList() {
      let a = this.biaoQianName;
    },
    //点击标签切换
    clickName(name, index) {
      this.$emit("nameChange", index);
    },
  },
};
</script>

<style lang="less"  scoped>
.el-dropdown-link {
  display: inline-block;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  margin: 24px 0 10px 0;
  font-size: 12px;
}
.allList /deep/.el-dropdown-menu {
  position: relative;
  top: 150px;
  left: 328px;
}
.el-dropdown-menu /deep/ li {
  display: block;
}

.biaoQian {
  span {
    font-size: 12px;
  }
}
.biaoQianItem {
  display: inline-block;
  font-size: 12px;
  li {
    display: inline-block;
    cursor: pointer;
    color: #555;
  }
}
.musicImgBox {
  margin-top: 18px;
}
</style>