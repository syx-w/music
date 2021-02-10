<template>
  <div v-if="info">
    <div class="commentTitle"><h2>听友评论</h2></div>
    <div class="inputCon">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="inputText"
        maxlength="140"
        show-word-limit
        clearable
        size="small "
        resize="none"
      />
      <div class="sendBtn">
        <el-button size="mini" @click="send()"
          >发送 <i class="el-icon-edit"
        /></el-button>
      </div>
    </div>
    <div class="comTitle">精彩评论</div>
    <div class="commentBox">
      <div class="comItem" v-for="(item, index) in info" :key="index">
        <div class="picBox">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="con_Box">
          <div class="nameBox">
            <span>{{ item.user.nickname }}</span
            >:{{ item.content }}
          </div>
          <div class="timeBox">{{ item.time | showData }}</div>
          <div class="sanL">
            <span class="cur"
              ><i class="el-icon-thumb" style="color: #ccc"
                >({{ item.likedCount }})</i
              ></span
            >
            | <span class="cur">分享</span> |
            <span class="cur">回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/tool";
export default {
  data() {
    return {
      inputText: "",
    };
  },
  props: ["info", "id", "type", "pageSize", "total"],

  components: {},
  created() {},
  methods: {
    async send() {
      const res = await this.$http.post("/comment", {
        id: this.id,
        type: this.type,
        content: this.inputText,
        t: 1,
      });
      if ((res.data.code = 200)) {
        this.$message.success("发送成功！");
        setTimeout(() => {
          this.$router.go(0);
        }, 500);
      }
      console.log(res);
    },
    pageChange(page) {
      this.$emit("pageChange", page);
    },
  },
  filters: {
    showData: function (value) {
      let data = new Date(value);
      return formatDate(data, "yyyy-MM-dd");
    },
  },
};
</script>

<style lang='less' scoped>
.commentTitle {
  width: 100%;

  border-bottom: 1px solid #ccc;
  h2 {
    font-size: 19px;
    font-weight: 400;
    margin: 5px 0;
  }
}
.inputCon {
  position: relative;
  height: 110px;
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(100, 100, 100, 0.3);
  .el-input {
    margin: auto 0;
  }
}
.sendBtn {
  position: absolute;
  right: 15px;
  bottom: 6px;
}
.sendBtn /deep/ .el-button--mini {
  padding: 3px 12px;
}

.comTitle {
  width: 100%;
  height: 40px;
  font-size: 13px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
.commentBox {
  width: 100%;
}
.comItem {
  width: 100%;
  // min-height: 75px;
  // height: 75px;
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .picBox {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.con_Box {
  position: relative;
  width: calc(100% - 50px);
  min-height: 40px;
  .nameBox {
    padding-bottom: 15px;
    left: 0;
    top: 0;
    span {
      color: #0c73c2;
    }
  }
  .timeBox {
    position: absolute;
    left: 0;
    bottom: 0;
    color: #ccc;
  }
  .sanL {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ccc;
  }
}
</style>