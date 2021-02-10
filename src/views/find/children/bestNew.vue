<template>
  <div>
    <!-- 新歌速递，新碟上架 -->
    <div class="topTabs">
      <Tabs @songsTabs="songsTabs" />
    </div>
    <div class="tabs">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first">
            <Musiclist1 :musiclist="musiclist1" v-if="state" />
            <Musiclist2 :musiclists="musiclist2" v-if="!state" />
          </el-tab-pane>
          <el-tab-pane label="华语" name="second">
            <Musiclist1 :musiclist="musiclist1" v-if="state" />
            <Musiclist2 :musiclists="musiclist2" v-if="!state"
          /></el-tab-pane>
          <el-tab-pane label="欧美" name="third">
            <Musiclist1 :musiclist="musiclist2" v-if="state" /><Musiclist2
              :musiclists="musiclist2"
              v-if="!state"
            />
          </el-tab-pane>
          <el-tab-pane label="韩国" name="fourth">
            <Musiclist1 :musiclist="musiclist2" v-if="state" /><Musiclist2
              :musiclists="musiclist2"
              v-if="!state"
          /></el-tab-pane>
          <el-tab-pane label="日本" name="fiveth">
            <Musiclist1 :musiclist="musiclist2" v-if="state" /><Musiclist2
              :musiclists="musiclist2"
              v-if="!state"
          /></el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>


<script>
import Tabs from "components/find/bestNew/tabs";
import Musiclist1 from "components/find/bestNew/musiclist";
import Musiclist2 from "components/find/bestNew/musiclist2";
export default {
  data() {
    return {
      state: true,
      activeName: "first",
      index: 0,
      musiclist1: [],
      musiclist2: [],
      //新碟上架
      query2: {
        limit: 30,
        offset: 0,
        area: "ALL",
      },
    };
  },
  components: {
    Tabs,
    Musiclist1,
    Musiclist2,
  },
  created() {
    this.getMusicList1(0);
  },
  methods: {
    //获取新歌速递列表
    async getMusicList1(type) {
      console.log(type);
      const res = await this.$http.get("/top/song", { params: { type: type } });
      this.musiclist1 = res.data.data.slice(0, 20);
      console.log(this.musiclist1);
    },
    //获取新碟上架列表
    async getMusicList2(type) {
      console.log(type);
      const res = await this.$http.get("/top/album", {
        params: { limit: 30, offset: 0, area: type },
      });
      console.log(res);
      this.musiclist2 = res.data.albums;
      console.log(this.musiclist2);
    },
    handleClick(tab) {
      this.musiclist1 = [];
      this.musiclist2 = [];
      if (tab) {
        this.index = Number(tab.index);
      }
      if (this.state) {
        switch (this.index) {
          case 1:
            this.getMusicList1(7);
            break;
          case 2:
            this.getMusicList1(96);
            break;
          case 3:
            this.getMusicList1(8);
            break;
          case 4:
            this.getMusicList1(16);
            break;
          default:
            this.getMusicList1(0);
        }
      } else {
        switch (this.index) {
          case 1:
            this.getMusicList2("ZH");
            break;
          case 2:
            this.getMusicList2("EA");
            break;
          case 3:
            this.getMusicList2("KR");
            break;
          case 4:
            this.getMusicList2("JP");
            break;
          default:
            this.getMusicList2("ALL");
        }
      }
    },
    //监听歌曲切换
    songsTabs(state) {
      if (state != undefined) {
        this.state = state;
        console.log(state);
        this.handleClick();
      }
    },
  },
};
</script>

<style lang='less' scoped>
.topTabs {
  width: 100%;
  margin-top: 10px;
}
</style>