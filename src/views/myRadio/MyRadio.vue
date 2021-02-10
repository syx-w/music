<template>
  <body>
    <div>
      <el-form
        label-position="right"
        label-width="120px"
        :model="formData"
        class="formBox"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="文章图片：" prop="from">
          <imgUpload v-model="formData.imgList" />
        </el-form-item>
      </el-form>
      {{ formData.imgList }}
    </div>
  </body>
</template>

<script>
import imgUpload from "./hehe";
export default {
  data() {
    return {
      formData: { imgList: [] },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {
    imgUpload,
  },
  created() {},
  methods: {
    inputing(e) {
      console.log(e);
    },
  },
};
</script>

<style lang='less' scoped>
</style>