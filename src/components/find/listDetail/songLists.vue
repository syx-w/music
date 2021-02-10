<template >
  <div class="mBox">
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="playMusicList"
      stripe
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="index" label=" " width="50px"> </el-table-column>
      <el-table-column label="操作" width="60px">
        <template slot-scope="scope">
          <div class="caoZuoBtn">
            <img src="~assets/images/geXing/心.png" alt="喜欢" /><img
              src="~assets/images/geXing/下载.png"
              alt="下载"
            />
          </div>
          <div class="playing" v-if="ifPlaying(scope.row)">
            <img src="~assets/images/geXing/心-熊.png" alt="喜欢" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        :show-overflow-tooltip="true"
        label="音乐标题"
        width="333px"
      >
      </el-table-column>
      <el-table-column
        prop="ar[0].name"
        :show-overflow-tooltip="true"
        label="歌手"
        width="236px"
      >
      </el-table-column>
      <el-table-column
        prop="al.name"
        :show-overflow-tooltip="true"
        label="专辑"
        width="214px"
      >
      </el-table-column>
      <el-table-column prop="dt" label="时长"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { timeFormat } from "common/tool";

import {
  getListDetail,
  getSongListInfoSongs,
  getMusicUrl,
} from "network/children/geXing";

import {} from "network/request";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      musicIds: [],
      playlist: {},
      creators: {},
      count: 0,
      nowCount: 1,
      i: 0,
    };
  },
  created() {
    this.getMusicList();
    console.log("hehe");
    document
      .getElementById("Right_box")
      .addEventListener("scroll", this.listener, true);
    console.log("hehe");
  },
  mounted() {},
  destroyed() {
    document
      .getElementById("Right_box")
      .removeEventListener("scroll", this.listener, true);
  },
  methods: {
    //获取列表
    async getMusicList() {
      let _this = this;
      if (_this.tableData) _this.tableData = [];
      if (_this.musicIds) _this.musicIds = [];
      let id = _this.$route.params.id;
      if (!id) return;
      var res = await _this.$http.get("playlist/detail", {
        params: { id: id },
      });
      console.log(res);
      _this.playlist = res.data.playlist;
      _this.creators = res.data.playlist.creator;
      this.nowCount = 20;
      this.getTwoInfo(this.nowCount);
    },
    //每次获取20条数据
    getTwoInfo(n) {
      this.musicIds = [];
      //获取列表前20条数据
      for (this.i; this.i < n; this.i++) {
        this.musicIds.push(this.playlist.trackIds[this.i].id);
      }
      //获取列表前20条数据每条的信息
      this.musicIds.map((item2) => {
        this.getSongDetail(item2);
      });
    },
    //获取每首歌时长名字歌手
    getSongDetail(item) {
      getSongListInfoSongs(item)
        .then((res) => {
          item += "";
          res.songs[0].dt = timeFormat(res.songs[0].dt);
          //每首歌的信息保存
          this.tableData.push(res.songs[0]);
        })
        .catch((err) => console.log(err));
    },
    //点击某音乐之后播放
    playMusicList(e) {
      var audio = document.getElementById("musicAudio");
      audio.loop = true;
      console.log(e);
      this.$store.commit("playMusicList", e);
      this.$store.commit("setMusicUrl");
      getMusicUrl(e.id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data[0].url);
        })
        .catch((err) => console.log(err));
    },
    //每一条数据
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    //是否是正在播放
    ifPlaying(row) {
      // return this.$store.state.musicInfo.index===this.row
      if (!row) return;
      return row.index === this.$store.state.musicInfo.index;
    },
    //下拉懒加载
    listener() {
      let a = document.getElementById("Right_box").scrollHeight;
      let b = document.getElementById("Right_box").clientHeight;
      let c = document.getElementById("Right_box").scrollTop;
      console.log(a, b, c);
      if (a - b === c && this.nowCount < this.playlist.trackIds.length) {
        this.nowCount += 20;
        this.getTwoInfo(this.nowCount);
      }
    },
  },
  mounted() {},
  computed: {},
  watch: {
    $route: function (to, from) {
      if (!this.tableData) {
        this.getMusicList();
      } else {
        this.tableData = [];
        this.getMusicList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mBox {
  margin-bottom: 30px;
}
.mBox /deep/ .el-table {
  opacity: 0.9;
  background-color: rgba(255, 255, 255, 0.6) !important;
}
.el-table /deep/ th {
  padding: 3px;
  border-right: 1px solid var(--color-line);
  font-weight: 400;
  color: #000;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}
.el-table /deep/ tr {
  white-space: nowrap;
}
.el-table/deep/ td {
  padding: 3px 0;
  font-size: 11px;
}
.el-table /deep/ td,
th.is-leaf {
  border: 0;
  white-space: nowrap;
}
.el-table /deep/ .el-table__row {
  // background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.el-table /deep/ .el-table__row:hover {
  color: #000;
}

.caoZuoBtn {
  width: 100%;
  height: 20px;
  img {
    cursor: pointer;
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    margin-left: 4px;
  }
  :nth-child(2) {
    top: 1px;
  }
  :nth-child(1) {
    left: -2px;
  }
}

.playing {
  position: absolute;
  left: -50px;
  top: 3px;
  img {
    width: 25px;
    height: 21px;
  }
}
</style>