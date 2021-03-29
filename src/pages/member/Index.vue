<template>
  <el-card>
    <el-table :data="getMemberList" style="width: 100%">
      <el-table-column prop="uid" label="用户ID" min-width="180" align="center"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" min-width="180" align="center"> </el-table-column>
      <el-table-column prop="phone" label="手机号" min-width="180" align="center"> </el-table-column>
      <el-table-column prop="addtime" label="注册日期" min-width="180" align="center">
        <template v-slot="props">
            {{props.row.addtime | dateFmt}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template v-slot="props">
          <el-button size="mini" circle icon="el-icon-edit" type="success" @click="edit(props.row)"></el-button>
          <el-button size="mini" circle icon="el-icon-delete" type="danger" @click="del(props.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <Model :info="info" ref="model" @updateList="updateList"/>
  </el-card>
</template>

<script>
import {mapState,mapActions } from 'vuex'
// 导入子组件
import Model from './Model'
export default {
  computed:{
    ...mapState({
      getMemberList:state=>state.member.getMemberList
    })
  },
  components:{
    Model
  },
  created(){
    // 更新列表
    this.getMemberListAction()
  },
  // // 过滤器
  // filters:{
  //   dateFmt(time,divider='-'){
  //     // console.log(time);
  //     const date = new Date(Number(time));
  //     const y = date.getFullYear();
  //     const m = date.getMonth()+1;
  //     const d = date.getDate();
  //     const h = date.getHours();
  //     const mm = date.getMinutes();
  //     const s = date.getSeconds();
  //     return `${y}${divider}${m}${divider}${d} ${h}:${mm}:${s}`
  //   }
  // },
  methods:{
    ...mapActions('member',['getMemberListAction']),
    // 编辑
    edit(row){
      // 通过ref属性操作model
      this.$refs.model.editList(row);
      // console.log(row);
      // 通知兄弟元素显示模态框
      this.info.isShow=true;
    },
    // 更新视图
    updateList(){
      // 接收子组件发送的数据
      this.getMemberListAction()
      
    },
    // 删除
    del(id){
      // console.log(id);
      // 询问确定删除提示框
      this.$myConfirm(()=>{
        // 根据id查找索引
        const index = this.getMemberList.findIndex(function(item){
          return item.id===id
        })
        // console.log(index);
        // 通过索引删除数据
        this.getMemberList.splice(index,1)
      })
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