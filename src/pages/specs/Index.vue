<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <el-divider />
    <List
      :page="page"
      @sendData="sendData"
      :specsList="specsList"
      :specsTotal="specsTotal"
      :size="size"
      @updateList="updateList"
    />
    <Modal @updateList="updateList" :info="info" />
  </el-card>
</template>

<script>
// 导入辅助方法
import { mapState, mapActions } from "vuex";
// 调用子组件List
import List from "./List";
// 调用子组件Modal
import Modal from "./Modal";
export default {
  // 注册子组件
  components: {
    List,
    Modal,
  },
  data() {
    return {
      // 对话框
      info: {
        isShow: false,
      },
      // 页码
      page: 1,
      // 显示的条数
      size: 2,
    };
  },
  created() {
    // 请求数据列表
    this.getSpecsListAction({ page: this.page, size: this.size });
    this.getSpecsTotalAction();
  },
  computed: {
    ...mapState({
      specsList: (state) => state.specs.specsList,
      specsTotal: (state) => state.specs.specsTotal,
    }),
  },
  methods: {
    ...mapActions("specs", ["getSpecsListAction", "getSpecsTotalAction"]),
    // 自定义事件的处理方法
    sendData(page) {
      // console.log(page);
      // 更新page
      this.page = page;
      // 更新数据列表
      this.getSpecsListAction({ page: this.page, size: this.size });
      // this.getSpecsTotalAction();
    },

    // 接收子组件 更新数据列表
    updateList() {
      if (
        Math.ceil(this.specsTotal / this.size) === this.page &&
        this.specsTotal % this.size === 1
      ) {
        // 页码减1
        this.page -= 1;
      }
      this.getSpecsListAction({ page: this.page, size: this.size }),
        this.getSpecsTotalAction();
    },
  },
};
</script>

<style>
</style>