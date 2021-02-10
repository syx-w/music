<template>
  <div>
    <div class="allList">
      <el-dropdown size="medium" trigger="click">
        <span class="el-dropdown-link">
          全部歌单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="position: relative; top: -20px"
        >
          <el-dropdown-item v-for="(item, index) in cateageName" :key="index">{{
            item.name
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="biaoQian">
      <span style="margin-right: 14px">热门标签:</span>
      <ul class="biaoQianItem">
        <li
          v-for="(item, index) in biaoQianName"
          :key="index"
          @click="clickName(item.name, index)"
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
    <div class="musicImgBox clearfix">
      <music-img :musiclists="musicList"></music-img>
    </div>
    <Fenye
      :total="total"
      :limit="cateListProm.limit"
      @pageChange="pageChange"
    />
  </div>
</template>

<script>
import { scrollAnimation } from "common/tool";

import musicImg from "common/musicImg";
import Fenye from "components/fenye/fenye";
import { getTopPlayList } from "network/children/musicList";
export default {
  data() {
    return {
      //音乐列表
      musicList: [],
      //目录名字
      cateageName: [],
      //标签名字
      biaoQianName: [],
      //歌单获取
      cateListProm: { limit: 60, offset: 0, cat: "全部" },
      total: 10,
    };
  },
  components: { musicImg, Fenye },
  created() {
    //获取分类名字
    this.getCateageName();
    //获取音乐图片
    this.getBiaoName(this.cateListProm);
  },
  methods: {
    //获取分类名字
    async getCateageName() {
      console.log("hehe");
      const res = await this.$http.post("playlist/hot");
      this.biaoQianName = res.data.tags;
      this.cateageName = [...this.biaoQianName].splice(0, 5);
    },
    //获取音乐图片
    async getBiaoName(cateListProm) {
      await this.$http
        .get("top/playlist", { params: cateListProm })
        .then((res) => {
          console.log(this.cateListProm);
          console.log(res);
          this.total = res.data.total;
          this.musicList = res.data.playlists;
        });
    },
    //点击类名获取歌曲
    clickName(name, index) {
      console.log(name);
      this.cateListProm.cat = name;
      this.getBiaoName(this.cateListProm);
    },
    //监听页面改变
    pageChange(page) {
      this.cateListProm.offset = (page - 1) * this.cateListProm.limit;
      let length = document.getElementById("Right_box").scrollHeight;
      scrollAnimation(length, 0);
      this.getBiaoName(this.cateListProm);
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
  // top: -40px;
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
  }
}
.musicImgBox {
  margin-top: 18px;
}
</style>