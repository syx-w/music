<template>
  <div>
    <div class="bg">
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
          <img src="~assets/images/wyy.png" alt />
        </div>
        <div class="right-top">
          <i class="el-icon-minus"></i>
          <i class="el-icon-close"></i>
        </div>
        <!-- 登录方式切换 -->
        <div class="change_login">
          <div
            class="phone_login"
            @click="phoneForm = 'one'"
            :class="phoneForm === 'one' ? 'login_active' : ''"
          >
            手机号登录
          </div>
          <div
            class="user_login"
            @click="phoneForm = 'two'"
            :class="phoneForm === 'two' ? 'login_active' : ''"
          >
            账号登录
          </div>
          <div
            class="user_login"
            @click="scanCode"
            :class="phoneForm === 'three' ? 'login_active' : ''"
          >
            扫码登录
          </div>
        </div>
        <div></div>
        <!-- 手机号登录表单 -->
        <el-form
          ref="loginForm"
          label-width="0px"
          :rules="loginFormRules"
          class="login_form"
          :model="phoneLoginForm"
          :style="phoneForm !== 'one' ? 'display:none' : ''"
        >
          <!-- 手机号 -->
          <el-form-item prop="username">
            <el-input
              placeholder="请输入手机号"
              prefix-icon="el-icon-user"
              v-model="phoneLoginForm.phone"
            ></el-input>
          </el-form-item>
          <!--手机验证码 -->
          <el-form-item prop="code">
            <el-input
              placeholder="短信验证码"
              v-model="phoneLoginForm.captcha"
              style="width: 50%"
              type="number"
            >
            </el-input>
            <el-button
              style="width: 50%; color: red"
              @click="getCode"
              id="codeChange"
              >获取验证码</el-button
            >
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="codeLogin">登录</el-button>
            <el-button type="info" @click="resetLogin">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 账号登录表单区 -->
        <el-form
          ref="loginFormRef"
          label-width="0px"
          :rules="loginFormRules"
          class="login_form"
          :model="loginForm"
          :style="phoneForm !== 'two' ? 'display:none' : ''"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="loginForm.phone"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 扫码区 -->
        <div
          class="saoCode"
          :style="phoneForm !== 'three' ? 'display:none' : ''"
        >
          <div>
            <el-image
              src="https://github.com/Chinese0/img/blob/master/2yue/1.jpg?raw=true"
              style="width: 150px; height: 220px"
            >
              <!-- <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div> -->
            </el-image>
          </div>
          <h3>请打开<span style="color: red">网易云音乐</span>扫码二维码</h3>
        </div>
      </div>
      <div class="img_box">
        <img
          src="https://th.bing.com/th/id/Ra8f466ae8171f74d8a9cfcd7e7284be6?rik=fYW6GHVusYvm%2bA&riu=http%3a%2f%2ftupian.qqw21.com%2farticle%2fUploadPic%2f2019-6%2f201962717313730705.jpeg&ehk=b9fcz8JyM7Z%2b7GY1y%2fQcyzRQ0VlJa8XYUwxV2HBTmLo%3d&risl=&pid=ImgRaw"
          alt=""
        />
        <div class="sport1"></div>
        <div class="sport2"></div>
        <div class="sport3"></div>
        <div class="sport4"></div>
      </div>
    </div>
    <div class="bgBox"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        phone: "15731214911",
        password: "yuxi1314",
      },
      phoneLoginForm: {
        phone: "15731214911",
        captcha: null,
      },
      //表单验证规则对象
      loginFormRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" }, //blur失去焦点
        ],

        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
      // 图片连接
      imgSrc:
        "https://raw.githubusercontent.com/Chinese0/img/master/2%E6%9C%88/1.jpg",
      //是否显示登录对话框
      // loginShow: true,
      // 登录切换
      phoneForm: "one",
    };
  },
  created() {},
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    resetLogin() {
      this.$refs.loginForm.resetFields();
    },
    async login() {
      const res = await this.$http.post("login/cellphone", this.loginForm);
      if (res.statusText !== "OK") {
        this.loginShow = false;
        return this.$message.error(
          "登陆失败,您输入的手机号或密码有误，请重新输入！"
        );
      }
      if (res.statusText === "OK") {
        this.$message.success("登陆成功！");
        // token只应在当前网站打开期间生效,所以将token保存在sessionStorage中
        // window.sessionStorage.setItem("token", res.token);
        // this.$store.commit("getProfile", res.data.profile);
        window.localStorage.setItem("getP", JSON.stringify(res.data.profile));
        this.$store.commit("getLogin", true);
        return this.$router.push("/home/find/geXing");
      } else {
        return console.log(res);
      }
    },
    async getCode() {
      document.getElementById("codeChange").disabled = true;
      this.$http.get("/captcha/sent?phone=" + this.phoneLoginForm.phone);
      let i = 60;
      function xunHuan() {
        document.getElementById("codeChange").innerHTML = i-- + "秒后重新发送";
        if (i > 0) {
          setTimeout(xunHuan, 1000);
        } else {
          document.getElementById("codeChange").disabled = false;
          document.getElementById("codeChange").innerHTML = "获取验证码";
        }
      }
      setTimeout(xunHuan, 1000);
    },
    async codeLogin() {
      let res = this.$http.get("/captcha/verify", {
        params: this.phoneLoginForm,
      });
      console.log(res);
    },
    async scanCode() {
      this.phoneForm = "three";
      let res = await this.$http.get("/login/qr/create");
      console.log(res);
    },
    async codeLogin() {
      if (("" + this.phoneLoginForm.captcha).length !== 4) {
        return alert("请输入正确的验证码");
      }
      alert("服务不可用");
      let res = await this.$http.get("/captcha/verify", {
        params: this.phoneLoginForm,
      });
      console.log(res);
      if (res.data.data == 200) {
        this.$message.success("登陆成功！");
        window.localStorage.setItem("getP", JSON.stringify(res.data.profile));
        this.$store.commit("getLogin", true);
        return this.$router.push("/home/find/geXing");
      } else {
        alert("验证码错误!");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bgBox {
  width: 100%; /*宽度铺满屏幕*/
  padding-top: 52.734%; /*图片高度除以宽度，得到此值*/
  // background: url("~assets/images/download/壁纸3.jpg") no-repeat; /*两个center分别为水平和垂直方向的对齐方式*/
  // background-color: rgb(77, 27, 9);
  background-size: 100%; /*背景水平铺满*/
  filter: blur(8px); /*虚化值，越大越模糊*/
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  // background: url("~assets/images/download/壁纸3.jpg") no-repeat;
  background-size: 100% 100%;
  // background: rgba(255, 255, 255, 0.3);
  z-index: 9999;
  // filter: blur(13px);
}
.bigBox {
  margin: 0px auto;
  height: 400px;
  width: 550px;
  background-color: rgb(247, 107, 107);
  border-radius: 10px;
}
.saoCode {
  display: flex;
  width: 450px;
  height: 290px;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.img_box {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
}
.sport1 {
  position: absolute;
  bottom: 70px;
  left: -30px;
  width: 450px;
  height: 30px;
  background-color: #000;
  animation: myMove1 10s infinite;
}
.sport2 {
  position: absolute;
  right: 80px;
  bottom: 500px;
  width: 30px;
  height: 30px;
  background-color: #000;
  animation: myMove2 10s infinite;
}
.sport3 {
  position: absolute;
  bottom: 70px;
  left: -30px;
  width: 30px;
  height: 30px;
  background-color: #000;
  animation: myMove3 10s infinite;
}
.sport4 {
  position: absolute;
  top: -20px;
  right: 80px;
  width: 30px;
  height: 30px;
  background-color: #000;
  animation: myMove4 10s infinite;
}
@keyframes myMove1 {
  0% {
    width: 350px;
    background-color: rgb(165, 0, 0);
  }
  50% {
    width: 100px;
    background-color: #000;
  }
  100% {
    width: 350px;
    background-color: rgb(165, 0, 0);
  }
}
@keyframes myMove2 {
  0% {
    width: 350px;
    background-color: rgb(165, 0, 0);
  }
  50% {
    width: 100px;
    background-color: #000;
  }
  100% {
    width: 350px;
    background-color: rgb(165, 0, 0);
  }
}
@keyframes myMove3 {
  0% {
    height: 100px;
    background-color: rgb(165, 0, 0);
  }
  50% {
    height: 350px;
    background-color: rgb(0, 0, 0);
  }
  100% {
    height: 100px;
    background-color: rgb(165, 0, 0);
  }
}
@keyframes myMove4 {
  0% {
    height: 100px;
    background-color: rgb(165, 0, 0);
  }
  50% {
    height: 350px;
    background-color: #000;
  }
  100% {
    height: 100px;
    background-color: rgb(165, 0, 0);
  }
}
.login_box {
  margin-top: -60px;
  width: 450px;
  height: 400px;
  // background: rgb(89, 38, 38);
  border-radius: 10px;
  position: absolute;
  right: 0%;
  top: 50%;
  transform: translate(-50%, -50%);
  // background-color: #eee;
  // border: 3px solid #ccc;
  box-shadow: 0 0 10px #ddd;
}

.avatar_box > img {
  position: absolute;
  left: 50%;
  top: 0%;
  transform: translate(-50%, -50%);
  height: 65px;
  // border-radius: 46px;
  // border: 1px solid #eee;
  // box-shadow: 0 0 4px #ddd;
}
.right-top {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 36px;
  // background-color: blue;
}
.right-top {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    display: inline-block;
    width: 25px;
  }
}

.change_login {
  margin-top: 60px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  > div {
    display: inline-block;
    width: 40%;
    box-sizing: border-box;
    text-align: center;
    height: 100%;
    font-size: 22px;
    line-height: 50px;
    cursor: pointer;
    // transition: all 0.2s;
  }
  :hover {
    color: red;
    border-bottom: 2px solid red;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 50px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.biao /deep/.el-tab-pane {
  height: 330px;
}
.login_active {
  color: red;
  border-bottom: 2px solid red;
}
</style>