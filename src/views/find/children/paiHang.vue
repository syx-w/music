<template>
  <div>
    <Head-title style="margin-top: 25px" :headName="'官方榜'" :show="false" />
    <Item-img
      :imgInfo="item"
      :indexInfo="index"
      v-for="(item, index) in allMes"
      :key="index"
    />
    <Head-title style="margin-top: 25px" :headName="'全球榜'" :show="false" />
    <Quan-qiu :musiclists="allSongs" />
    <!-- <Music-img :musiclists="allSongs"></Music-img> -->
  </div>
</template>

<script>
import MusicImg from "common/musicImg";

import HeadTitle from "components/find/zhuBo/headTitle";
import ItemImg from "components/find/paiHang/itemImg";
import QuanQiu from "components/find/paiHang/quanQiu";

export default {
  data() {
    return {
      //所有信息
      allMes: [],
      //全球榜歌单
      allSongs: [],
    };
  },
  components: {
    HeadTitle,
    ItemImg,
    QuanQiu,
    MusicImg,
  },
  created() {
    this.getPaiHangList();
  },
  methods: {
    async getPaiHangList() {
      const res = await this.$http.post("toplist");
      this.allMes = res.data.list.splice(0, 6);
      this.allSongs = res.data.list;
      console.log(this.allSongs);
    },
  },
};
</script>

<style lang='less' scoped>
</style>