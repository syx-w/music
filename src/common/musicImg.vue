<template>
  <!-- 发现音乐---个性推荐 -->
  <div class="mainBox">
    <ul class="bigBox" v-for="(item, index) in musicList" :key="index">
      <li class="eachBox" @click="eachClick(item.id)">
        <div class="picBox">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="textBox">{{ item.description }}</div>
        <div class="countIcon">
          <span>{{ (item.playCount / 10000).toFixed(0) + "万" }}</span>
          <i class="el-icon-headset" />
        </div>
        <div class="boFang"><i class="el-icon-video-play"></i></div>
        <div class="topText">
          <p>{{ item.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  components: {},
  props: {
    musiclists: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      musicList: [],
      //
      loadingInstance: null,
    };
  },
  created() {
    this.getMusicList();
  },
  methods: {
    //获取歌单列表
    async getMusicList() {
      //加载中
      this.loadingInstance = Loading.service({
        target: ".mainBox", // DOM 节点
        text: "QAQ加载中，主人请稍后",
        background: "rgba(0,0, 0, 0.1)",
      });
      //生成随机数
      const num = (Math.random() * 100).toFixed(0);
      //获取随机歌曲
      const res = await this.$http.post(`top/playlist?offset=${num}&limit=15`);
      //赋值给歌单
      this.musicList = res.data.playlists;
      console.log(res);
      this.loadingInstance.close();
      //
    },

    //歌单图片点击
    eachClick(id) {
      this.$router.push(`/home/listDetail${id}`);
    },
  },
  computed: {
    //赋值听的数量
    getMusicCount() {
      return function (num) {
        if (num === undefined) {
          return 99;
        } else {
          return (num / 10000).toFixed(0);
        }
      };
    },
  },
  watch: {
    //深度监听，解决组件传值不及时问题
    musiclists: {
      handler: function (value) {
        this.musicList = value;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>


<style lang="less" scoped>
.tuiJian {
  position: relative;
  bottom: 38px;
  height: 33px;
  width: 100%;
  border-bottom: 1px solid #e1e1e2;
  float: left;
  // background-color: red;
  h5 {
    float: left;
    font-size: 18px;
    font-weight: 400;
  }
  a {
    float: right;
    position: relative;
    top: 7px;
    right: 0;
    color: #000;
  }
}

.eachBox {
  position: relative;
  width: 173px;
  height: 215px;
  margin-right: 15px;
  margin-bottom: 35px;
  float: left;
  cursor: pointer;
  overflow: hidden;

  list-style: none;
}
.eachBox:nth-child(5),
.eachBox:nth-child(10) {
  margin-right: 0;
}
.picBox {
  width: 175px;
  height: 175px;
  img {
    width: 100%;
  }
  margin-bottom: 8px;
}
.textBox {
  width: 175px;
  height: 31px;
  font-size: 13px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.countIcon {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 20px;
  line-height: 20px;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.2),
    rgba(255, 255, 255, 0)
  );
  span,
  i {
    position: relative;
    right: 4px;
    float: right;
    font-size: 12px;
    color: #fff;
  }
  i {
    position: relative;
    top: 5px;
    right: 7px;
  }
}
.boFang {
  position: absolute;
  bottom: 40px;
  right: 0;
  font-size: 31px;
  i {
    color: rgba(255, 255, 255, 0.95);
  }

  transform: translateX(115%);
  transition: 0.3s;
}
.bigBox:hover .boFang {
  transform: translateY(0);
}
.topText {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-115%);
  transition: 0.3s;
  p {
    padding: 5px 5px;
    font-size: 12px;
    color: #fff;
  }
}
.bigBox:hover .topText {
  transform: translateX(0);
}
</style>