<template>
  <!-- 发现音乐---个性推荐 -->
  <div class="mainBox">
    <ul v-for="(item, index) in musiclists" :key="index">
      <li
        :class="(index + 1) % 6 ? 'eachBox   ' : ' eachBox clearMargin '"
        @click="eachClick(item.id)"
      >
        <div class="picBox">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="textBox">{{ item.name }}</div>
        <div class="countIcon">
          <span>{{ (item.playCount / 10000).toFixed(0) + "万" }}</span>
          <i class="el-icon-headset" />
        </div>
        <div class="boFang"><i class="el-icon-video-play"></i></div>
        <div class="topText">
          <p>{{ item.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    musiclists: {
      type: Array,
      default: [],
    },
  },
  components: {},
  created() {},
  methods: {
    eachClick(id) {
      this.$router.push(`/home/listDetail${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.mainBox {
  float: left;
  width: 100%;
  margin-top: 20px;
}
.clearMargin {
  margin-right: 0 !important;
}
.eachBox {
  float: left;
  position: relative;
  width: 144px;
  height: 175px;
  margin-right: 15px;
  margin-bottom: 35px;
  float: left;
  cursor: pointer;
  overflow: hidden;

  list-style: none;
}
.eachBox:nth-child(5),
.eachBox:nth-child(10) {
  margin-right: 0;
}
.picBox {
  width: 100%;
  height: 145px;
  img {
    width: 100%;
  }
}
.textBox {
  width: 100%;
  height: 31px;
  line-height: 31px;
  font-size: 13px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.countIcon {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 20px;
  line-height: 20px;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.2),
    rgba(255, 255, 255, 0)
  );
  span,
  i {
    position: relative;
    right: 4px;
    float: right;
    font-size: 12px;
    color: #fff;
  }
  i {
    position: relative;
    top: 5px;
    right: 7px;
  }
}
.boFang {
  position: absolute;
  bottom: 40px;
  right: 0;
  font-size: 31px;
  i {
    color: rgba(255, 255, 255, 0.95);
  }

  transform: translateX(115%);
  transition: 0.3s;
}
.eachBox:hover .boFang {
  transform: translateY(0);
}
.topText {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-115%);
  transition: 0.3s;
  p {
    padding: 5px 5px;
    font-size: 12px;
    color: #fff;
  }
}
.bigBox:hover .topText {
  transform: translateX(0);
}
</style>