<template>
  <el-card>
    <el-button @click="showModal" icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
    <!-- 分割线 -->
    <el-divider />
    <!-- tree-props:指定二级菜单数据存储的属性节点名称 -->
    <el-table
    :data="menuList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    :tree-props="{children: 'children'}">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="icon"
      label="图标">
      <!-- 接收组件内部分发出来的数据 -->
      <template v-slot="props">
        <!-- 固定的里面有row方法 -->
        <!-- {{props.row}} -->
        <i :class="props.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="地址">
    </el-table-column>
     <el-table-column
      prop="status"
      label="状态">
      <!-- 接收组件内部分发出来的数据 -->
      <template v-slot="props">
        <!-- 固定的里面有row方法 -->
        <!-- {{props.row}} -->
        <el-tag v-if="props.row.status===1" type="success">正常</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template v-slot="props">
          <el-button @click="edit(props.row)" circle size="mini" icon="el-icon-edit" type="success"></el-button>
          <el-button @click="del(props.row.id)" circle size="mini" icon="el-icon-delete" type="danger"></el-button>
      </template>
    </el-table-column>
  </el-table>

   <!-- 调用对话框组件 -->
    <Modal ref="modalRef" :info="info" @updateList="updateList"/>

  </el-card>
</template>

<script>
import Modal from './Modal'
import { mapState,mapActions } from 'vuex'
export default {
  components:{
      Modal
  },
  created(){
    this.getMenuListAction();
  },
  computed:{
    ...mapState({menuList:state=>state.menu.menuList})
  },
  methods:{
    ...mapActions('menu',['getMenuListAction']),
    showModal(){
      this.info.isShow=!this.info.isShow
    },
    // 自定义事件updateList的处理函数
    updateList(){
      this.getMenuListAction()
    },
    // 编辑数据
    edit(obj){
      // console.log(obj);
      // 更新info
      this.info.isShow=true;
      // 通过ref属性操作组件modal
      this.$refs.modalRef.setFormData(obj);
    },
    // 删除数据
    del(id){
      this.$myconfirm(()=>{
        // 发送请求删除数据
        this.$http.post('/menudelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg);
            // 更新数据列表
            this.getMenuListAction()
            return false;  // 防止后续代码的执行
          }
          this.$error(res.msg)
        })
      })
    }
  },
  data(){
    return{
      info:{
        isShow:false
      },
       tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  }
}
</script>

<style>

</style>