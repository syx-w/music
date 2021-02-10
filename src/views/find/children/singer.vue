<template>
  <div class="maxBox" ref="maxBoxRef" id="maxBox">
    <div class="choice">
      <Lable-choice
        :lableTitlt="'语种'"
        :lableList="this.language"
        @lableChange="changeLangle"
      />
      <Lable-choice
        :lableTitlt="'分类'"
        :lableList="this.fenLei"
        @lableChange="changeFenlei"
      />
      <Lable-choice
        :lableTitlt="'筛选'"
        :lableList="this.shaiXuan"
        @lableChange="changeShaixuan"
      />
    </div>
    <div class="singersBox" ref="singersRef">
      <div
        :class="(index + 1) % 6 ? 'singers ' : 'singers clearMarginRight'"
        v-for="(item, index) in this.singersList"
        :key="index"
      >
        <div class="imgBox" @click="clickImg(item)">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="nameBox">
          <h5>{{ item.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingersList } from "network/children/search";

import LableChoice from "components/find/singer/LableChoice";
export default {
  data() {
    return {
      singersList: [],
      //歌手名字
      letter: "-1", //筛选
      type: "-1", //分类
      area: "-1", //语种
      limit: 30, //数量
      language: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      fenLei: ["全部", "男歌手", "女歌手", "乐队组合"],
      shaiXuan: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
    };
  },
  components: {
    LableChoice,
  },
  created() {
    this.getSingersList(-1, -1, -1);
  },
  mounted() {
    //监听滚轮滚动
    document
      .getElementById("Right_box")
      .addEventListener("scroll", this.listener, true);
  },
  destroyed() {
    // document
    //   .getElementById("Right_box")
    //   .removeEventListener("scroll", this.listener, true);
    console.log("离开了");
  },
  methods: {
    //获取歌手列表
    getSingersList(letter, type, area, limit) {
      getSingersList(letter, type, area, limit).then((res) => {
        this.singersList = res.artists;
      });
    },
    //监听语言标签改变
    changeLangle(e) {
      switch (e) {
        case 0:
          this.area = -1;
          break;
        case 1:
          this.area = 7;
          break;
        case 2:
          this.area = 96;
          break;
        case 3:
          this.area = 8;
          break;
        case 4:
          this.area = 16;
          break;
        case 5:
          this.area = 0;
          break;
      }
      this.getSingersList(this.letter, this.type, this.area);
    },
    //监听分类标签改变
    changeFenlei(e) {
      if (e == 0) {
        this.type = -1;
      } else {
        this.type = e;
      }
      this.getSingersList(this.letter, this.type, this.area);
    },
    //监听筛选标签改变
    changeShaixuan(e) {
      if (e === 0) {
        this.letter = -1;
      } else if (e === this.shaiXuan.length - 1) {
        this.letter = 0;
      } else {
        this.letter = this.shaiXuan[e];
      }
      this.getSingersList(this.letter, this.type, this.area);
    },
    //监听滚轮滚动

    listener() {
      let h = document.getElementById("Right_box").scrollHeight;
      let c = document.getElementById("Right_box").clientHeight;
      let t = document.getElementById("Right_box").scrollTop;
      console.log(h, c, t);

      if (t === h - c) {
        console.log("到底了");
        console.log(this.limit);

        if (this.limit < 80) {
          this.limit += 30;
          console.log(this.limit);
          return this.getSingersList(
            this.letter,
            this.type,
            this.area,
            this.limit
          );
        } else {
          return;
        }
      }
    },
    //监听图片点击
    clickImg(item) {
      this.$router.push("/home/singer" + item.id);
      console.log(item);
    },
  },
};
</script>

<style lang='less' scoped>
.choice {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-line);
}

/* .singersBox {
  margin-bottom: 30px;
}
 */
.singers {
  float: left;
  width: 145px;
  height: 170px;
  margin-top: 30px;
  margin-right: 14px;
  .imgBox {
    width: 100%;
    height: 145px;
    overflow: hidden;
    img {
      max-height: 100%;
    }
  }
  .nameBox {
    width: 100%;
    height: 25px;
    h5 {
      font-weight: 400;
      line-height: 25px;
    }
  }
}

/* .maxBoxRef {
  width: 850px;
  height: 1000px;
  overflow: auto;
} */

.singersBox:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}
</style>