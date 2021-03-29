<template>
  <div>
    <el-card>
      <!-- <Stylus /> -->
      <!-- 富文本编辑器 -->
      <Editor />
      <el-divider></el-divider>
      <Bar />
      <el-divider></el-divider>
      <Lines />
      <el-divider></el-divider>
      <Pie />
    </el-card>
  </div>
</template>

<script>
// 导入实例组件
import Bar from "./echarts/Bar";
import Lines from "./echarts/Lines";
import Pie from "./echarts/Pie";
import Editor from "./Editor.vue";
// import Stylus from './Stylus'
export default {
  components: {
    Bar,
    Lines,
    Pie,
    Editor,
    // Stylus
  },
};
</script>

<style>
</style>