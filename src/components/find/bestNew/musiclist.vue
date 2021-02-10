<template>
  <body>
    <header>
      <span class="cur" @click="playAll()"
        ><i class="el-icon-video-play"></i>播放全部</span
      ><span class="cur"><i class="el-icon-folder-add"></i>收藏全部</span>
    </header>
    <div class="mainBox">
      <ul>
        <li
          v-for="(item, index) in this.musiclist"
          :key="index"
          @click="clickMusic(item)"
        >
          <div class="index">
            {{ index > 9 ? index + 1 : "0" + (index + 1) }}
          </div>
          <div class="imgBox">
            <img :src="item.album.picUrl" alt="" /><span
              class="cur"
              style="color: #000"
            >
              {{ item.name }}</span
            >
            <i class="el-icon-video-play"></i>
          </div>
          <div class="artistsName nowp cur">
            <span
              v-for="(item1, index) in item.artists"
              :key="'name' + index"
              >{{
                index + 1 === item.artists.length
                  ? item1.name
                  : item1.name + " "
              }}</span
            >
          </div>
          <div class="musicName nowp cur">{{ item.name }}</div>
          <div class="timeBox nowp cur">
            {{ item.duration || item.dt | showTime }}
          </div>
        </li>
      </ul>
    </div>
  </body>
</template>

<script>
import { timeFormat } from "common/tool";
import { getMusicUrl } from "network/children/geXing";
export default {
  data() {
    return {};
  },
  props: ["musiclist"],
  components: {},
  created() {},
  methods: {
    //点击某音乐播放
    async clickMusic(e) {
      var audio = document.getElementById("musicAudio");
      audio.loop = true;
      console.log(e);
      const res = await this.$http.get("song/detail", {
        params: { ids: e.id },
      });
      console.log(res.data.songs[0]);
      this.$store.commit("playMusicList", res.data.songs[0]);
      this.$store.commit("setMusicUrl");
      getMusicUrl(e.id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data[0].url);
        })
        .catch((err) => console.log(err));
    },
    //播放全部
    playAll() {
      this.clickMusic(this.musiclist[0]);
    },
  },
  computed: {},
  filters: {
    showTime: function (value) {
      const num = new Date(value);
      return timeFormat(num);
    },
  },
};
</script>

<style lang='less' scoped>
body {
  width: 100%;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
  border-bottom: 0px;
  box-sizing: border-box;
  font-size: 13px;
  padding: 0 10px;
  i {
    font-size: 20px;
    margin: 0 1px;
  }
}
.mainBox {
  width: 100%;
  background-color: #f5f5f7;
  border: 1px solid #eee;
  box-sizing: border-box;
  color: #666666;
  ul {
    li {
      width: 100%;
      height: 60px;
      font-size: 13px;
      div {
        float: left;
        height: 100%;
        line-height: 60px;
      }
      .index {
        width: 45px;
        text-align: center;
      }
      .imgBox {
        position: relative;
        width: 420px;
        img {
          margin: 10px auto;
          height: 40px;
          width: 40px;
        }
        span {
          position: relative;
          bottom: 25px;
        }
        i {
          color: #fff;
          position: absolute;
          left: 7px;
          top: 17px;
          font-size: 25px;
        }
      }
      .artistsName {
        width: 175px;
      }
      .musicName {
        width: 240px;
      }
    }
  }
}
ul li:nth-child(even) {
  background-color: #fff;
}
.active {
  background-color: #ebeced;
}
ul li:hover {
  color: #000;
  background-color: #ebeced;
}
</style>