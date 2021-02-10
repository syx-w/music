<template>
  <body>
    <div class="topBox">
      <div class="imgBox"><img :src="info.simpleUserInfo.avatar" alt="" /></div>
      <div class="textBox">
        <div class="nameBox">{{ info.simpleUserInfo.nickname }}</div>
        <div class="timeBox">{{ info.time | showTime }}</div>
      </div>
    </div>
    <div class="contBox">{{ info.content }}</div>
    <div class="btnBox">
      <div class="liu">浏览88次数</div>
      <span><img src="~assets/images/home/点赞.png" alt="" /></span>
      <span><img src="~assets/images/home/评论.png" alt="" /></span>
      <span><img src="~assets/images/home/转发.png" alt="" /></span>
    </div>

    <div class="likeCount">
      <img src="~assets/images/home/赞黑.png" alt="" />
      <!-- <img src="" alt=""> -->
      杨幂、李易峰、李宇春、韩雪、范冰冰、赵薇、申雨茜 等{{
        info.likedCount
      }}人觉得很赞
    </div>
    <div class="comment">
      <input type="text" placeholder="评论" />
      <div class="imgBox">
        <img src="~assets/images/home/照相机.png" alt="" />
      </div>
    </div>
  </body>
</template>

<script>
import { timeago } from "common/tool";
export default {
  data() {
    return {};
  },
  props: ["info"],
  components: {},
  created() {},
  methods: {},
  filters: {
    showTime: function (time) {
      return timeago(time);
    },
  },
};
</script>

<style lang='less' scoped>
body {
  margin: 10px 5px;
  background-color: #fff;
  width: 95%;
}
.topBox {
  margin-top: 10px;

  width: 96%;
  height: 40px;
  .imgBox {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 7px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .textBox {
    display: inline-block;
    position: relative;
    bottom: 3px;
    font-size: 14px;
    margin-left: 10px;
    width: 250px;
    height: 100%;
    .nameBox {
      color: red;
    }
    .timeBox {
      color: #888;
      font-size: 12px;
      width: 100%;
    }
  }
}
.contBox {
  margin-top: 10px;
  margin: 3% 1%;
  font-size: 14px;
  line-height: 23px;
  width: 100%;
}
.btnBox {
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  span {
    width: 20px;
    height: 20px;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .liu {
    position: absolute;
    left: 5px;
    top: 3px;
    font-size: 13px;
    color: #888;
  }
}

.likeCount {
  color: #295c9d;
  border-top: 1px solid #ddd;
  padding-top: 5px;
  margin-left: 5px;
  img {
    width: 15px;
    height: 15px;
  }
  font-size: 13px;
}

.comment {
  position: relative;
  width: 90%;
  height: 25px;
  border: 0.5px solid #ccc;
  margin: 15px 5%;
  input {
    height: 100%;
    width: 100%;
    outline: none;
  }
  .imgBox {
    position: absolute;
    right: 0;
    top: 5px;
    width: 20px;
    height: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>