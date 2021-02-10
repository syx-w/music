<template>
  <div>
    <div><swiper :banners="bannersInfo"></swiper></div>
    <cards> </cards>
    <head-title class="fuFeiTitle" :headName="'电台个性推荐'"></head-title>
    <itemImg
      :imgSrc="item.picUrl"
      :textContent="item.rcmdtext"
      v-for="(item, index) in dianTaiInfo"
      :key="index + 'dianTaiInfo'"
      :nameText="item.name"
      :class="(index + 1) % 6 ? '' : 'clearMargin'"
    ></itemImg>
    <head-title class="fuFeiTitle" :headName="'创作|翻唱'"></head-title>
    <itemImg
      :imgSrc="item.picUrl"
      :textContent="item.rcmdtext"
      v-for="(item, index) in chuangZuoInfo"
      :key="index + 'chuangZuoInfo'"
      :nameText="item.name"
      :class="(index + 1) % 6 ? '' : 'clearMargin'"
    ></itemImg>
    <head-title class="fuFeiTitle" :headName="'3D|电子'"></head-title>
    <itemImg
      :imgSrc="item.picUrl"
      :textContent="item.rcmdtext"
      v-for="(item, index) in dianZiInfo"
      :key="index + 'dianZiInfo'"
      :nameText="item.name"
      :class="(index + 1) % 6 ? '' : 'clearMargin'"
    ></itemImg>
    <head-title class="fuFeiTitle" :headName="'音乐故事'"></head-title>
    <itemImg
      :imgSrc="item.picUrl"
      :textContent="item.rcmdtext"
      v-for="(item, index) in musicGuShiInfo"
      :key="index + 'musicGuShiInfo'"
      :nameText="item.name"
      :class="(index + 1) % 6 ? '' : 'clearMargin'"
    ></itemImg>
    <head-title class="fuFeiTitle" :headName="'情感调频'"></head-title>
    <itemImg
      :imgSrc="item.picUrl"
      :textContent="item.rcmdtext"
      v-for="(item, index) in qingGanInfo"
      :key="index + 'qingGanInfo'"
      :nameText="index.name"
      :class="(index + 1) % 6 ? '' : 'clearMargin'"
    ></itemImg>
    <head-title class="fuFeiTitle" :headName="'二次元'"></head-title>
    <itemImg
      :imgSrc="item.picUrl"
      :textContent="item.rcmdtext"
      v-for="(item, index) in erCiInfo"
      :key="index + 'erCiInfo'"
      :nameText="item.name"
      :class="(index + 1) % 6 ? '' : 'clearMargin'"
    ></itemImg>
  </div>
</template>

<script>
import swiper from "components/find/swiper";
import cards from "components/find/zhuBo/card";
import headTitle from "components/find/zhuBo/headTitle";
import itemImg from "components/find/zhuBo/itemImg";

import { getAnchorType } from "network/children/dianTai";

export default {
  data() {
    return {
      bannersInfo: [],
      cardInfo: [],
      dianTaiInfo: [],
      chuangZuoInfo: [],
      dianZiInfo: [],
      musicGuShiInfo: [],
      qingGanInfo: [],
      erCiInfo: [],
    };
  },
  components: {
    swiper,
    cards,
    headTitle,
    itemImg,
  },
  created() {
    this.getBanners();
    this.getCard();
    this.getDianTaiInfo();
    this.getChuangZuoInfo();
    this.getDianZiInfo();
    this.getMusicGuShiInfo();
    this.getQingGanInfo();
    this.getErCiInfo();
  },
  methods: {
    //轮播图
    async getBanners() {
      const res = await this.$http.post("dj/banner");
      this.bannersInfo = res.data.data;
    },
    //红色卡片
    async getCard() {
      const res = await this.$http.post("dj/catelist");
      this.cardInfo = res.data.categories;
    },
    //电台个性推荐
    async getDianTaiInfo() {
      const res = await this.$http.post("dj/recommend");
      console.log(res);
      this.dianTaiInfo = [...res.data.djRadios.splice(0, 6)];
    },
    //创作|翻唱
    getChuangZuoInfo() {
      getAnchorType("2001").then((res) => {
        this.chuangZuoInfo = [...res.djRadios.splice(0, 6)];
      });
    },
    //电子
    getDianZiInfo() {
      getAnchorType("3").then((res) => {
        this.dianZiInfo = [...res.djRadios.splice(0, 6)];
      });
    },
    //音乐故事
    getMusicGuShiInfo() {
      getAnchorType("2").then((res) => {
        this.musicGuShiInfo = [...res.djRadios.splice(0, 6)];
      });
    },
    //情感
    getQingGanInfo() {
      getAnchorType("10002").then((res) => {
        this.qingGanInfo = [...res.djRadios.splice(0, 6)];
      });
    },
    //二次元
    getErCiInfo() {
      getAnchorType("3001").then((res) => {
        this.erCiInfo = [...res.djRadios.splice(0, 6)];
      });
    },
  },
};
</script>

<style lang='less' scoped>
.fuFeiTitle {
  margin-top: 50px;
}
.clearMargin {
  margin-right: 0;
}
</style>