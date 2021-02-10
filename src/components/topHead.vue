<template>
  <div class="w box">
    <div class="left">
      <img class="logo" src="~assets/images/logo.png" alt />
    </div>
    <div class="right">
      <!-- 前进后退 -->
      <div class="boxLeft">
        <div class="arrow-left" @click="clickLeft">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="arrow-right" @click="clickRight">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- 搜索 -->
      <div class="boxCenter h">
        <input
          class="search-text h"
          type="text"
          placeholder="搜索音乐，视频，歌词，电台"
          v-model="inputContent"
          @keyup.enter="clickSearch()"
          clearable
        />
        <i class="el-icon-search" @click="clickSearch()"></i>
      </div>
      <div class="topRight">
        <div class="boxRightRight">
          <i class="el-icon-minus"></i>
          <div class="max"></div>
          <i class="el-icon-close"></i>
        </div>
        <div class="boxRight">
          <img :src="profile.avatarUrl" class="f" alt />
          <a href="#" class="f hc" @click="logOutShow = !logOutShow">{{
            profile.nickname
          }}</a>
          <i
            class="el-icon-caret-bottom f littleI"
            @click="logOutShow = !logOutShow"
          ></i>
          <div
            :class="logOutShow ? 'noLogOutBtn ' : 'logOutBtn bg'"
            style="font-size: 12px"
            @click="clickLogOut"
          >
            退出登录
          </div>
          <div :class="logOutShow ? 'noTriangle' : 'triangle'"></div>
          <a href="#" class="f">开通VIP</a>
          <i class="el-icon-user f"></i>
          <i class="el-icon-message f"></i>
          <i class="el-icon-setting f"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "topHead",
  data() {
    return {
      //搜索内容
      serchContent: "",
      //退出登录显示
      logOutShow: true,
      //个人信息
      profile: {
        accountStatus: 0,
        authStatus: 0,
        authority: 0,
        avatarImgId: 109951164677081620,
        avatarImgIdStr: "109951164677081622",
        avatarImgId_str: "109951164677081622",
        avatarUrl:
          "https://p4.music.126.net/CTdiLpyZnnaQvoaS6Qheow==/109951164677081622.jpg",
        backgroundImgId: 109951164821696270,
        backgroundImgIdStr: "109951164821696277",
        backgroundUrl:
          "https://p3.music.126.net/BbqNnT8No61xX901-40EbA==/109951164821696277.jpg",
        birthday: -2209017600000,
        city: 130600,
        defaultAvatar: false,
        description: "",
        detailDescription: "",
        djStatus: 0,
        eventCount: 0,
        expertTags: null,
        experts: {},
        followed: false,
        followeds: 2,
        follows: 10,
        gender: 1,
        mutual: false,
        nickname: "雨西",
        playlistBeSubscribedCount: 0,
        playlistCount: 4,
        province: 130000,
        remarkName: null,
        signature: "",
        userId: 547016550,
        userType: 0,
        vipType: 0,
      },
      //输入框的内容
      inputContent: "",
    };
  },
  created() {
    this.showProfile();
  },
  methods: {
    //退出登录
    clickLogOut() {
      window.sessionStorage.clear(); //清空token
      this.$router.push("/login");
      alert("账号已退出！");
    },
    //显示个人信息
    showProfile() {
      this.profile = JSON.parse(window.localStorage.getItem("getP"));
    },
    //后退
    clickLeft() {
      if (this.$route.path === "/home/find/geXing") {
        return;
      }
      this.$router.go("-1");
    },
    //前进
    clickRight() {
      this.$router.go("1");
    },
    //搜索点击
    clickSearch() {
      console.log(this.inputContent);
      this.$router.push("/home/search" + this.inputContent).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style   scoped>
.box {
  position: relative;
  background-color: #c62f2f;
  height: 50px;
}
.logo {
  float: left;
  height: 23px;
  width: 114px;
  margin-top: 13px;
  margin-left: 15px;
}
.boxLeft {
  margin-left: 190px;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.boxLeft > div {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  width: 28px;
  height: 20px;
  background-color: #c62f2f;
  border: 1px solid #a82828;
  cursor: pointer;
}

.boxCenter i {
  margin-left: 5px;
}

.boxCenter {
  position: absolute;
  top: 14px;
  left: 255px;
  width: 220px;
  font-size: 8px;
  background-color: #a82828;
  border-radius: 20px;
}
.boxCenter input {
  display: inline-block;
  width: 180px;
  margin-left: 10px;
  background-color: #a82828;
  border: 0;
  outline: none;
  color: #fff;
}
.boxCenter input::-webkit-input-placeholder {
  color: #edbdbd;
  font-size: 8px;
}

.h {
  height: 23px;
}

.topRight {
  float: right;
  position: absolute;
  top: 0;
  right: 0;
}
.boxRight,
.boxRightRight {
  position: relative;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 118px;
}
.el-icon-setting {
  margin: 0 10px;
}
.boxRight {
  width: 250px;
}
.boxRight img {
  margin-right: 5px;
  width: 17px;
  border-radius: 50%;
}
.boxRight a {
  flex: 2;
}
.f {
  flex: 1;
}
.max {
  width: 10px;
  height: 8px;
  border-radius: 10%;
  background-color: #c62f2f;
  border: 1px solid #edbdbd;
  margin: 0 20px;
}
.logOutBtn,
.noLogOutBtn {
  /* display: none; */
  position: absolute;
  top: 50px;
  left: -13px;
  width: 170px;
  height: 50px;
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
  line-height: 50px;
  user-select: none;
  z-index: 999;
  box-shadow: 0 0 5px #aaa;
}
.triangle,
.noTriangle {
  position: absolute;
  top: 40px;
  left: 60px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
}
.noLogOutBtn,
.noTriangle {
  display: none;
}
.littleI {
  cursor: pointer;
}
/* 触碰变色 */
.hc:hover {
  color: #fff;
}
.bg:hover {
  background-color: #eceded;
}
</style>