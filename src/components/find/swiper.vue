<template>
  <div>
    <!-- 轮播图 -->
    <template>
      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
        style="margin: 20px 30px"
      >
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <a :href="item.url">
            <img :src="item.imageUrl || item.pic" alt="" class="imgSize" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>

<script>
export default {
  name: "swiper",
  data() {
    return {};
  },
  props: {
    banners: {
      type: Array,
      default: [],
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.imgSize {
  height: 100%;
}
</style>