<template>
  <el-table :data="bannerList" style="width: 100%">
    <el-table-column prop="title" label="轮播图名称" min-width="180" align="center">
    </el-table-column>
    <el-table-column prop="img" label="图片" min-width="180"  align="center">
      <template v-slot="props">
        <img :src="$imgBaseUrl + props.row.img" style="height: 40px" alt="" />
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" min-width="180"  align="center">
        <template v-slot="props">
            <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180"  align="center">
        <template v-slot="props">
            <el-button size="mini" type="success" icon="el-icon-edit" circle @click="edit(props.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="del(props.row.id)"></el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm'
export default {
  props: ["bannerList"],
  methods:{
    edit(row){
      // console.log(row);
      // 通知兄弟元素显示待编辑的内容,显示模态框
      vm.$emit('sendDataBanner',row)
    },
    // 删除
    del(id){
      // console.log(id);
      // 是否确认删除的询问框
      this.$myConfirm(()=>{
        // 请求接口
        this.$http.post('/bannerdelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg);
            // 通知父元素更新视图列表
            this.$emit('updateList')
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