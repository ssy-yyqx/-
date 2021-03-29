<template>
  <el-card>
      <el-button @click="info.isShow=!info.isShow" icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
      <el-divider />
      <!-- 调用子组件List -->
      <List @updateList="updateList" :cateList="cateList"/>
      <!-- 调用子组件Modal -->
      <Modal :info="info" @updateList="updateList"/>
  </el-card>
</template>

<script>
// 导入子组件list
import List from './List';
import Modal from './Modal';
// 导入辅助方法
import {mapState,mapActions} from 'vuex';
export default {
  data(){
    return{
      info:{
        isShow:false
      }
    }
  },
  computed:{
    ...mapState({
      // state:系统自动注入, 数据存储对象
      cateList:function(state){
        return state.cate.cateList
      }
    })
  },
  components:{
    List,
    Modal
  },
  methods:{
    ...mapActions('cate',['getCateListAction']),
    // 自定义事件的处理函数
    updateList(){
      // 请求数据列表
      this.getCateListAction()
    }
  },
  created(){
    // 请求数据列表
    this.getCateListAction()
  }
}
</script>

<style>

</style>