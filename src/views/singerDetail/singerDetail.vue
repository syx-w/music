<template>
  <body>
    <div class="singerInfo">
      <div class="imgBox">
        <img :src="singerInfo.picUrl" alt="" />
        <div class="zhuYe"><i class="el-icon-user" /> 个人主页 ></div>
      </div>
      <div class="textBox">
        <div class="singerName"><span>歌手</span>{{ singerInfo.name }}</div>
        <div class="numBox">
          <ul>
            <li>单曲数:{{ singerInfo.musicSize }}</li>
            <li>专辑数:{{ singerInfo.albumSize }}</li>
            <li>MV数:{{ singerInfo.mvSize }}</li>
          </ul>
        </div>
        <div class="briefDesc">描述:{{ singerInfo.briefDesc }}</div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      //歌手id
      id: "",
      singerInfo: {},
    };
  },
  components: {},
  created() {
    //获得歌手id
    this.id = this.$route.params.id;
    //获得歌手部分单曲
    this.getSingerInfo(this.id);
  },
  methods: {
    //获得歌手部分单曲
    async getSingerInfo(id) {
      const res = await this.$http.get("artists", { params: { id } });
      this.singerInfo = res.data.artist;
      console.log(res.data);
    },
  },
};
</script>

<style lang='less' scoped>
body {
  margin: 30px 30px;
}
.singerInfo {
  display: flex;
  width: 100%;
  height: 200px;
  .imgBox {
    position: relative;
    width: 200px;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    img {
      height: 100%;
    }
    .zhuYe {
      position: absolute;
      left: 40px;
      bottom: 10px;
      width: 110px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid #aaa;
      cursor: pointer;
      i {
        color: #fff;
      }
    }
  }
  .textBox {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 640px;
    height: 100%;
    .singerName {
      font-size: 18px;
      font-weight: 500;
      span {
        display: inline-block;
        position: relative;
        bottom: 2px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        border-radius: 3px;
        margin-right: 4px;
        background-color: #c62f2f;
      }
    }
    .briefDesc {
      display: -webkit-box;
      -webkit-box-orient: vertical;

      -webkit-line-clamp: 3;

      overflow: hidden;
    }
    .numBox {
      ul {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>