<template>
  <el-card>
      <el-button @click="info.isShow=!info.isShow" type="primary" icon="el-icon-circle-plus-outline">添加秒杀</el-button>
      <Modal :info="info" @updateList="updateList"/>
      <List :seckillList="seckillList"  @updateList="updateList"/>
  </el-card>
</template>

<script>
// 使用辅助工具
import {mapState,mapActions} from 'vuex'
import Modal from './Modal'
import List from './List'
export default {
  components:{
    Modal,
    List
  },
  computed:{
    ...mapState({
      seckillList:state=>state.seckill.getSeckillList
    })
  },
  created(){
    // 初始化getSeckillListAction
    this.getSeckillListAction()
  },
  methods:{
    ...mapActions('seckill',['getSeckillListAction']),
    updateList(){
      this.getSeckillListAction()
    }
  },
  data(){
    return{
      info:{
        isShow:false
      }
    }
  }
}
</script>

<style>

</style>