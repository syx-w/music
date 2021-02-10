<template>
  <body>
    <div class="topBox">
      搜索<a>"{{ searchKey }}"</a>,共找到:{{ songsCount }}首单曲
    </div>
    <div class="list">
      <Song-lists :musicLists="songsList" />
    </div>
    <div class="fenye" v-if="songsCount">
      <Fenye :total="songsCount" :limit="limit" @pageChange="pageChange" />
    </div>
  </body>
</template>

<script>
import SongLists from "components/search/songLists";
import Fenye from "components/fenye/fenye";
export default {
  data() {
    return {
      songsCount: "",
      songsList: [],
      searchKey: "",
      limit: 30,
      offset: 0,
    };
  },
  components: {
    SongLists,
    Fenye,
  },
  created() {},
  mounted() {
    this.searchKey = this.$route.params.id;
    this.getMusicList();
  },
  methods: {
    //获取歌曲列表
    async getMusicList() {
      this.songsList = [];
      const res = await this.$http.get("/search", {
        params: {
          keywords: this.searchKey,
          limit: this.limit,
          offset: this.offset,
          type: 1,
        },
      });
      this.songsCount = res.data.result.songCount;
      this.songsList = res.data.result.songs;
      console.log(res.data.result.songs);
      console.log(res);
    },
    //监听页面改变
    pageChange(page) {
      this.offset = (page - 1) * this.limit;

      this.getMusicList();
    },
  },
  watch: {
    $route: function (to, from) {
      this.getMusicList();
      console.log("发生了改变");
      this.searchKey = this.$route.params.id;
      this.getMusicList();
    },
  },
};
</script>

<style lang='less' scoped>
body {
  margin: 30px 30px;
}
.topBox {
  margin-bottom: 30px;
  a {
    color: blue;
    font-size: 16px;
  }
}
</style>