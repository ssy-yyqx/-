<template>
  <div>
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"> </el-table-column>
      <el-table-column prop="rolename" label="角色" min-width="180"> </el-table-column>
      <el-table-column prop="username" label="账号" min-width="180"> </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template v-slot="props">
          <el-button @click="edit(props.row)" size="mini" circle type="success" icon="el-icon-edit"></el-button>
          <el-button @click="del(props.row.uid)" size="mini" circle type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 total:数据总条数-->
    <!-- current-change:点击分页按钮的事件
        page-size:每页显示的数据条数
    -->
    <el-pagination @current-change="pageUpdate" :page-size="size" background layout="prev, pager, next" :total="adminTotal"></el-pagination>
  </div>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm';
export default {
  props:['adminList','adminTotal','size'],
  data() {
    return {
      
    };
  },
  methods:{
    // 分页按钮被点击时候的处理函数
    // page:分页按钮的页码,系统自动注入
    pageUpdate(page){
      // console.log(page);
      // 通过this.$emit()将最新页码值传递给父组件Index
      this.$emit('updatePage',page)
    },
    // 编辑
    edit(row){
      // console.log(row);
      // 通过自定义事件将数据传递给兄弟组件Modal
      vm.$emit('updateList',{...row})
    },
    // 删除
    del(uid){
      // console.log(id);
      // 1.调用确认方法
      this.$myConfirm(()=>{
        // 2.发送数据请求
        this.$http.post('userdelete',{uid}).then(res=>{
          if(res.code===200){
            this.$success(res.msg)
             // 更新数据列表,通知父组件
            this.$emit('updateList');
          }else{
            this.$error(res.msg)
          }
        })
      })
    }
  }
};
</script>

<style>
</style>