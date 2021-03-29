<template>
  <el-card>
    <el-button @click="info.isShow=!info.isShow" type="primary" icon="el-icon-circle-plus-outline">添加轮播</el-button>
    <List :bannerList="bannerList" @updateList="updateList"/>
    <Modal :info="info" @updateList="updateList"/>
  </el-card>
</template>

<script>
// 导入vuex辅助方法
import { mapState, mapActions } from "vuex";
// 引入子模块
import List from './List'
import Modal from './Modal'
export default {
  computed:{
    ...mapState({
      bannerList:state=>state.banner.bannerList
    })
  },
  components:{
    List,
    Modal
  },
  created(){
    // 初始化列表 更新列表
    this.bannerListAction()
  },
  methods:{
    // 第一个参数模块名,第二个参数异步方法
    ...mapActions('banner',['bannerListAction']),
    // 更新数据列表
    updateList(){
       this.bannerListAction()
    }
  },
  data() {
    return {
      info:{
        isShow:false
      }
    };
  },
};
</script>

<style>
</style>