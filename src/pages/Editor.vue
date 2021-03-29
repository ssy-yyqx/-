<template>
  <div>
    <vueWangeditor ref="editor" style="height:300px" height="200" width="100%" id="editor" v-model="content" />
    <el-button @click="getContent" type="primary">获取</el-button>
    <el-button @click="setContent" type="success">设置</el-button>
  </div>
</template>

<script>
// 导入vue-wangeditor
import vueWangeditor from "vue-wangeditor";
export default {
  components: {
    vueWangeditor,
  },
  data() {
    return {
      content: `
                <div><h1>商品介绍</h1></div>
            `,
    };
  },
  methods: {
    //   获取富文本编辑器的内容
    // 获取时不需要参数
    getContent() {
      // getHtml();
      const content = this.$refs.editor.getHtml();
      console.log(content);
    },
    //   设置富文本编辑器的内容    需要参数
    setContent() {
        const setText = `<img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />`
        this.$refs.editor.setHtml(setText)
    },
  },
};
</script>

<style>
</style>