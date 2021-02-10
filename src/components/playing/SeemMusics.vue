<template>
  <div class="maxBox1" v-if="info">
    <header>
      <h4>相似歌曲</h4>
    </header>
    <body>
      <div class="itemBox" v-for="(item, index) in this.info" :key="index">
        <div class="imgBox">
          <img :src="item.cover || item.album.picUrl" alt="404" />
        </div>
        <div class="conBox">
          <div class="tit nowp">
            <span class="musicName">歌曲</span>{{ item.name }}
          </div>
          <div class="timeBox">{{ item.duration | showTime }}</div>
          <div class="zuo nowp">
            <span v-for="(item1, index1) in item.artists" :key="'x' + index1"
              ><span>{{
                index1 === item.artists.length - 1 ? item.name : item.name + "/"
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
  methods: {},
  filters: {
    showTime: function (value) {
      return timeFormat(value);
    },
  },
};
</script>

<style lang='less' scoped>
.maxBox1 {
  width: 245px;
  height: auto;
  margin-bottom: 140px;
}
header {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 1px;
  h4 {
    font-size: 19px;
    font-weight: 400;
    margin: 5px 0;
  }
}
.itemBox {
  font-size: 13px;
  height: 110px;
  width: 100%;
  margin: 4px 0;
}
.imgBox {
  cursor: pointer;
  float: left;
  width: 110px;
  height: 110px;
  margin: 10px 0;
  img {
    width: 100%;
  }
}
.conBox {
  float: right;
  width: 120px;
  height: 110px;
  display: flex;
  margin: 10px 0;
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