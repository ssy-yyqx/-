<template>
  <el-card>
      <el-button @click="info.isShow=!info.isShow" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
      <!-- 分割线 -->
      <el-divider />
      <!-- 表格 -->
      <!-- 调用列表组件 -->
      <List :roleList="roleList" @updateList="updateList"/>


      <!-- 调用表单子组件 -->
      <!-- :info="info"父组件向子组件传递数据,控制对话框的显示与隐藏 -->
      <Modal :info="info" @updateList="updateList"/>
      
    </el-card>
</template>

<script>
import { mapState,mapActions } from 'vuex';
// 导入子组件
import Modal from './Modal';
import List from './List';
export default {
  components:{
    // 注册子组件
    Modal,
    List
  },
  computed:{
    ...mapState({
      roleList:state=>state.role.roleList
    })
  },
  methods:{
    // role:子模块的名称
    // getRoleListAction: Actions的方法名  数组格式
    ...mapActions('role',['getRoleListAction']),
    // 自定义事件updateList的处理函数
    updateList(){
      // 更新数据列表
      this.getRoleListAction()
    }
  },
  created(){
    // 调用getRoleListAction方法
    this.getRoleListAction()
  },
  data() {
    return {
      info:{
        // 控制对话框的显示状态
        isShow:false
      }
    }
  }
};
</script>

<style>
</style>