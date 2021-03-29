<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider />
    <!-- 调用列表子组件 -->
    <!-- 通过自定义属性,向子组件传递数据 -->
    <List
      @updateList="updateList"
      @updatePage="updatePage"
      :size="size"
      :adminList="adminList"
      :adminTotal="adminTotal"
    />

    <!-- 调用对话框组件 -->
    <Modal @updateList="updateList" :info="info" />
  </el-card>
</template>

<script>
// 导入vuex的辅助方法
import { mapState, mapActions } from "vuex";
// 导入子组件 列表
import List from "./List";
import Modal from "./Modal";
export default {
  data() {
    return {
      info: {
        // 控制对话框显示
        isShow: false,
      },
      // 页码
      page: 1,
      // 每页显示的数据条数
      size: 2,
    };
  },
  computed: {
    ...mapState({
      adminList: (state) => state.admin.adminList,
      adminTotal: (state) => state.admin.adminTotal,
    }),
  },
  methods: {
    ...mapActions("admin", ["getAdminListAction", "getAdminTotalAction"]),
    // 自定义事件的处理函数
    updatePage(page) {
      // 1.更新页码
      this.page = page;
      // 2.重新请求数据列表
      this.getAdminListAction({ page: this.page, size: this.size });
    },
    // 自定义事件updateList的处理函数
    updateList() {
      if (
        // 当前处于最后一页&&最后一页只有一条数据   总条数/每页的条数===当前页码&& 总条数%每页的条数===1
        Math.ceil(this.adminTotal / this.size) === this.page &&
        this.adminTotal % this.size === 1
      ) {
        // 请求上一页数据
        //   this.$emit('updatePage',this.page-1)
        this.page -= 1;
      }
      
      // 1.更新数据列表
      this.getAdminListAction({ page: this.page, size: this.size });
      // 2.更新数据总条数
      this.getAdminTotalAction();
    },
  },
  created() {
    this.getAdminListAction({ page: this.page, size: this.size });
    this.getAdminTotalAction();
  },
  // 注册子组件
  components: {
    List,
    Modal,
  },
};
</script>

<style>
</style>