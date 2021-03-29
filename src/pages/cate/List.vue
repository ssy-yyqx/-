<template>
  <el-table
    :data="cateList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="id" min-width="80">
    </el-table-column>
    <el-table-column prop="img" label="分类图片" min-width="180">
      <template v-slot="props">
        <img v-if="props.row.img!==''" :src="$imgBaseUrl+props.row.img" style="height:80px" alt="">
      </template>
    </el-table-column>
    <el-table-column prop="catename" label="分类名称" min-width="180">
    </el-table-column>
    <el-table-column prop="status" label="状态" min-width="180">
      <template v-slot="props">
        <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180">
      <template v-slot="props">
        <el-button @click="edit(props.row)" type="success" circle icon="el-icon-edit" size="mini"></el-button>
        <el-button @click="del(props.row.id)" type="danger" circle icon="el-icon-delete" size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm.js'
export default {
  props:['cateList'],
  data() {
    return {
    };
  },
  methods:{
    // 编辑
    edit(row){
      // console.log(row);
      // 1.通过自定义事件把数据传递给兄弟组件Modal  2.显示对话框
      vm.$emit('sendCateData',{...row})
    },
    // 删除
    del(id){
      // console.log(id);
      // 调用确认删除的提示框
      this.$myConfirm(()=>{
        // 发送数据请求,删除数据
        this.$http.post('/catedelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg)
            // 更新数据列表:向父组件请求数据
            this.$emit('updateList')
          }else{
            this.$error(res.msg)
          }
        })
      })
    },
    
  }
};
</script>

<style>
</style>