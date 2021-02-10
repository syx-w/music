<template>
  <div>
    <div class="mainBox">
      <span class="titleSpan">{{ lableTitlt }}:</span>
      <ul v-for="(item, index) in lableList" :key="index">
        <li
          @click="clickLable(item, index)"
          :class="curIndex === index ? 'changeColor' : ''"
        >
          {{ item }}
        </li>
        <span v-if="!(index === lableList.length - 1)">|</span>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curIndex: 0,
    };
  },
  props: {
    lableTitlt: {
      type: String,
    },
    lableList: {
      type: Array,
    },
  },
  components: {},
  created() {},
  methods: {
    //点击某标签变色
    clickLable(item, index) {
      this.curIndex = index;
      this.$emit("lableChange", index);
    },
  },
};
</script>

<style lang='less' scoped>
.mainBox {
  font-size: 13px;
  color: #ccc;
  .titleSpan {
    margin: 10px 0;
    display: inline-block;
  }
  ul {
    display: inline-block;
    li {
      margin: 0 8px;
      padding: 2px 5px;
      border-radius: 4px;
      cursor: pointer;
    }
    li:hover {
      color: #000;
    }
  }
}

.changeColor {
  background-color: #f8bf68;
  color: #000;
}
</style>