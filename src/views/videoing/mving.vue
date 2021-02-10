<template>
  <div v-if="id">
    <body>
      <div class="leftBox">
        <div class="titleBox">
          <a href="#" style="color: #000">
            <i
              class="el-icon-arrow-left"
              style="color: #000"
              @click="backPage"
            ></i>
          </a>
          {{ videoInfo.name }}
        </div>
        <div class="videoBox">
          <video
            autoplay
            controls
            loop
            width="100%"
            height="100%"
            v-if="videoUrl"
          >
            <source :src="videoUrl" type="video/mp4" />
            <source :src="videoUrl" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="BtnBox">
          <el-button size="mini" icon="el-icon-thumb"
            >赞({{ videoInfo.subCount }})</el-button
          >
          <el-button size="mini" icon="el-icon-star-off"
            >收藏({{ videoInfo.commentCount }})</el-button
          >
          <el-button size="mini" icon="el-icon-share"
            >分享({{ videoInfo.shareCount }})</el-button
          >
          <el-button size="mini" icon="el-icon-download">下载MV</el-button>
        </div>
        <Comment
          v-if="this.videoComments"
          :info="this.videoComments"
          :id="this.videoInfo.vid"
          :type="5"
        />
        <Fenye :pageSize="pageSize" :total="total" @pageChange="pageChange" />
      </div>
      <div class="rightBox">
        <VideoTitlt :title="'视频介绍'" />
        <div class="jieBox">
          <div class="timeBox">
            发布时间:{{ videoInfo.publishTime | showDate
            }}<span style="margin-left: 10px"
              >播放次数:{{
                videoInfo.playCount > 10000
                  ? (videoInfo.playCount / 10000).toFixed(0) + "万"
                  : videoInfo.playCount
              }}</span
            >
          </div>
          <div class="jieShao">简介:{{ videoInfo.description || "null" }}</div>
          <div class="jieShao" v-if="videoInfo.creator">
            作者:{{ videoInfo.creator.nickname || null }}
          </div>
          <div class="biaoQian">标签:{{ bqString }}</div>
        </div>
        <VideoTitlt :title="'相关推荐'" />
        <Recommend :info="recList" />
        <div class="xgBox"></div>
      </div>
    </body>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Fenye from "components/fenye/fenye";
import VideoTitlt from "components/video/videoTitle";
import Comment from "components/playing/comment";
import Recommend from "components/video/recommend";

import { formatDate } from "common/tool";
export default {
  data() {
    return {
      videoInfo: {},
      videoUrl: "",
      videoComments: [],
      id: "",
      total: 0,
      offset: 0,
      pageSize: 30,
      bqList: [],
      bqString: "",
      videoTuijian: [],
      //推荐列表
      recList: [],
    };
  },
  components: {
    VideoTitlt,
    Comment,
    Fenye,
    Recommend,
  },
  computed: {
    ...mapGetters(["getVideoInfo"]),
  },
  created() {
    //获取视频id
    this.id = this.$route.params.id;
    //获取视频信息
    this.getVideo(this.id);
    //获得视频url
    this.getVideoUrl(this.id);
    //获得评论信息
    this.getVideoComment(this.id);
    //获得相关推荐
    this.getVideoTuijian(this.id);
  },
  mounted() {},
  destroyed() {},
  methods: {
    async getVideo(id) {
      const res = await this.$http.get("mv/detail", { params: { mvid: id } });
      this.videoInfo = res.data.data;
      console.log(this.videoInfo);

      this.videoInfo.videoGroup.map((item) => {
        this.bqList.push(item.name);
      });
      this.bqString = this.bqList.join("/");
    },
    async getVideoUrl(id) {
      this.videoUrl = "";
      const res = await this.$http.get("/mv/url", {
        params: {
          id: id,
        },
      });
      console.log(res);
      this.videoUrl = res.data.data.url;
    },
    async getVideoComment(id) {
      this.videoComments = "";
      const res = await this.$http.get("/comment/mv", {
        params: {
          id: id,
          limit: this.pageSize,
          offset: this.offset,
        },
      });
      this.total = res.data.total;
      if (this.offset > 0) {
        this.videoComments = res.data.comments;
      } else {
        this.videoComments = [...res.data.hotComments, ...res.data.comments];
      }
      console.log(res.data);
    },
    async getVideoTuijian(mvid) {
      this.videoTuijian = [];
      const res = await this.$http.get("/simi/mv", {
        params: {
          mvid,
        },
      });
      console.log(res.data);
      this.recList = res.data.mvs;
    },
    //页面改变
    pageChange(page) {
      this.offset = (page - 1) * this.pageSize;
      console.log(this.offset);
      this.getVideoComment(this.id);
    },
    //返回上一页
    backPage() {
      this.$router.go(-1);
    },
  },
  watch: {
    $route: function () {},
    getVideoInfo: function (info) {
      console.log("hehe");
      console.log(info);
    },
  },
  computed: {
    biaoqian() {
      this.videoInfo.videoGroup.map((item) => {
        this.bqList.push(item.name);
      });
      this.bqList.join("/");
    },
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style lang='less' scoped>
body {
  margin: 15px 15px;
  display: flex;
  justify-content: space-between;
}

.leftBox {
  width: 650px;
  min-height: 400px;
}
.rightBox {
  width: 280px;
  height: 400px;
}
.titleBox {
  height: 32px;
  line-height: 32px;
  a {
    i {
      font-size: 20px;
    }
  }
}
.videoBox {
  width: 100%;
  height: 400px;
  background-color: rgb(0, 0, 0);
  video:focus {
    outline: none;
  }
}
.BtnBox {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
}
.jieBox {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 13px;
}
</style>