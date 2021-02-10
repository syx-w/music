<template>
  <div>
    <div :class="(indexInfo + 1) % 3 ? ' maxBox ' : 'maxBox clearMargin'">
      <div
        class="imgBox"
        :style="{
          background:
            'url(' + imgInfo.coverImgUrl + ') no-repeat 0 -65px/300px 215px',
          height: '90px',
        }"
        @click="topImgClick()"
      ></div>

      <div class="musicList">
        <div class="rowBox" v-for="(item, index) in musicList" :key="index">
          <p class="indexSpan">{{ index }}</p>
          <div class="listRight">
            <p class="titleSpan" @click="clickTitle(item)">
              {{ item.name }}
            </p>
            <p class="singerSpan">{{ item.ar[0].name }}</p>
          </div>
        </div>
      </div>

      <div class="lookMore">
        <a href="#" @click="topImgClick()">查看等多></a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSongListInfoSongs,
  getListDetail,
  getMusicUrl,
} from "network/children/geXing";

export default {
  data() {
    return {
      musicId: "",
      musicListIds: [],
      // thisImgInfo:this.imgInfo
      musicList: [],
    };
  },
  props: {
    imgInfo: {
      type: Object,
      default: "",
    },
    indexInfo: {
      type: Number,
      default: "",
    },

    // listData: {
    //   type: Array,
    //   default: "",
    // },
  },
  components: {},
  created() {
    this.getMusicId();
    // this.getMusicListInfo();
  },
  methods: {
    //点击某音乐之后播放
    // playMusicList(e) {
    //   console.log(e.index);
    //   this.$store.commit("playMusicList", e);
    //   this.$store.commit("setMusicUrl");
    //   //获取该音乐url并上传到store
    //   getMusicUrl(e.id)
    //     .then((res) => {
    //       this.$store.commit("setMusicUrl", res.data[0].url);
    //     })
    //     .catch((err) => console.log(err));
    // },
    //获取每行索引
    // tableRowClassName({ row, rowIndex }) {
    //   row.index = rowIndex;
    // },
    //获取
    getMusicId() {
      getListDetail(this.imgInfo.id).then((res) => {
        //获取Ids
        const musicListInfos = res.playlist.trackIds.splice(0, 8);
        musicListInfos.map((item) => {
          this.musicListIds.push(item.id);
        });
        const musics = this.musicListIds.toString();
        if (!musics) return;
        getSongListInfoSongs(musics)
          .then((res) => {
            this.musicList = res.songs;
          })
          .catch((err) => console.log(err));
      });
    },
    //
    //根据Ids获取每首歌信息
    getMusicListInfo() {
      console.log(this.musicListIds);
      this.musicListIds.map((item) => {
        // const res = await this.$http.post("song/detail", { ids: item.id });
        console.log(item);
        // console.log(res);
      });
    },
    topImgClick() {
      this.$router.push("/home/listDetail" + this.imgInfo.id);
    },
    clickTitle(e) {
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
  },
  watch: {
    imgInfo(val, oldVal) {
      console.log("id: " + val, oldVal);
    },
  },
};
</script>

<style lang='less' scoped>
.maxBox {
  background-color: #fff;
  float: left;
  width: 300px;
  height: 370px;
  margin-top: 20px;
  margin-right: 20px;
  .imgBox {
    cursor: pointer;
  }
}

.clearMargin {
  margin-right: 0;
}

//列表
.musicList {
  // position: absolute;
  width: 300px;
  height: 240px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

//列表样式
.el-tabs__content /deep/ .el-table td {
  padding: 6px;
}
thead {
  /deep/ .el-table th {
    padding: 0;
  }
  /deep/ .el-table td {
    padding: 0;
  }
}

.el-table /deep/ th,
td {
  padding: 3px;
  border-right: 1px solid var(--color-line);
  font-weight: 400;
  color: #000;
  font-size: 12px;
  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.el-table/deep/ td,
th {
  padding: 3px 0;
  font-size: 11px;
}
.el-table /deep/ td,
th.is-leaf {
  border: 0;
}
.el-table /deep/ .el-table__row {
  cursor: pointer;
}
tr /deep/ el-table__row:hover {
  color: #000;
}
.rowBox:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.rowBox {
  width: 300px;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 13px;

  .indexSpan {
    width: 45px;
    color: rgb(245, 40, 40);
    font-size: 18px;
  }
  .listRight {
    float: left;
    width: 255px;
    .titleSpan {
      float: left;
      cursor: pointer;
    }

    .singerSpan {
      float: right;
      margin-right: 10px;
      color: #888;
    }
  }

  p {
    float: left;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.lookMore {
  float: right;
  height: 40px;
  width: 290px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  background-color: #f5f5f7;

  a {
    display: inline-block;
    color: #000;
    color: #888;
  }
}
</style>