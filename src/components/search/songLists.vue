<template>
  <div>
    <el-table
      :data="musicLists"
      style="width: 100%"
      @row-click="playMusicList"
      stripe
    >
      <el-table-column type="index" label=" " width="50px"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="音乐标题"
        width="280px"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="artists[0].name"
        label="歌手"
        width="236px"
      >
      </el-table-column>
      <el-table-column
        prop="album.name"
        :show-overflow-tooltip="true"
        label="专辑"
        width="214px"
      >
      </el-table-column>
      <el-table-column prop="duration" label="时长">
        <template slot-scope="scope">
          {{ scope.row.duration | timeFormatFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { timeFormat } from "common/tool";
import { getMusicUrl } from "network/children/geXing";
export default {
  data() {
    return {};
  },
  props: {
    musicLists: {
      type: Array,
    },
  },
  components: {},
  created() {},
  methods: {
    //播放音乐
    playMusicList(e) {
      var audio = document.getElementById("musicAudio");
      audio.loop = true;
      console.log(e);
      this.$store.commit("playMusicList", e);

      this.$store.commit("setMusicUrl");
      getMusicUrl(e.id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data[0].url);
        })
        .catch((err) => console.log(err));
    },
  },
  filters: {
    timeFormatFilter: function (time) {
      return timeFormat(time);
    },
  },
};
</script>

<style lang='less' scoped>
</style>