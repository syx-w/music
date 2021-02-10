<template>
  <div class="maxBox1" v-if="info">
    <body>
      <div class="itemBox" v-for="(item, index) in this.info" :key="index">
        <div class="imgBox" @click="imgClick(item.vid)">
          <img :src="item.cover || item.coverUrl" alt="404" />
          <span class="playTime"
            ><i class="el-icon-video-camera" />
            {{
              item.playTime > 10000
                ? (item.playTime / 10000).toFixed(0) + "万"
                : item.playTime || item.playCount > 10000
                ? (item.playCount / 10000).toFixed(0) + "万"
                : item.playCount
            }}</span
          >
        </div>
        <div class="conBox">
          <div class="tit nowp">
            <span class="musicName">歌曲</span>{{ item.title || item.name }}
          </div>
          <div class="timeBox">
            {{ item.durationms || item.duration | showTime }}
          </div>
          <div class="zuo nowp" v-if="item.creator">
            <span v-for="(item1, index1) in item.creator" :key="'x' + index1"
              ><span>{{
                index1 === item.creator.length - 1
                  ? item1.userName
                  : item1.userName + "/"
              }}</span></span
            >
          </div>
          <div class="zuo nowp" v-if="item.artists">
            <span v-for="(item1, index1) in item.artists" :key="'x' + index1"
              ><span>{{
                index1 === item.artists.length - 1
                  ? item1.name
                  : item1.name + "/"
              }}</span></span
            >
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { timeFormat } from "common/tool";

export default {
  data() {
    return {};
  },
  props: {
    info: {
      type: Array,
    },
  },
  components: {},
  created() {},
  methods: {
    imgClick(vid) {
      this.$router.push("videoing" + vid);
      this.$router.go(0);
      console.log(vid);
    },
  },
  filters: {
    showTime: function (value) {
      return timeFormat(value);
    },
  },
};
</script>

<style lang='less' scoped>
.maxBox1 {
  width: 100%;
  height: auto;
  margin-bottom: 140px;
}

.itemBox {
  font-size: 13px;
  height: 110px;
  width: 100%;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.imgBox {
  cursor: pointer;
  position: relative;
  width: 140px;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  img {
    height: 100%;
  }
  .playTime {
    position: absolute;
    right: 5px;
    top: 5px;
    color: #fff;
    i {
      color: #fff;
      position: relative;
      left: 4px;
    }
  }
}
.conBox {
  width: 120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.musicName {
  padding: 2px;
  margin: 0 2px;
  background-color: rgba(216, 191, 187, 0.8);
  border-radius: 3px;
  color: blue;
}

.cur {
  i {
    color: #ccc;
  }
}
</style>