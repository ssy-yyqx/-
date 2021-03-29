<template>
  <div>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"> </el-table-column>
      <el-table-column prop="firstcatename" label="一级分类" min-width="180">
      </el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" min-width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" min-width="180">
      </el-table-column>
      <el-table-column prop="img" label="商品图片" min-width="180">
        <template v-slot="props">
          <img :src="$imgBaseUrl + props.row.img" style="height: 80px" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="零售价格" min-width="180">
        <template v-slot="props"> &yen;{{ props.row.price }} </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" min-width="180">
        <template v-slot="props"> &yen;{{ props.row.price }} </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" min-width="180">
        <template v-slot="props">
          <el-tooltip
            :content="props.row.isnew === 0 ? '否' : '是'"
            placement="top"
          >
            <el-switch
              v-model="props.row.isnew"
              :active-value="1"
              :inactive-value="0"
              @change="statusChanges(props.row,'isnew')"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" min-width="180">
        <template v-slot="props">
          <el-tooltip
            :content="props.row.ishot === 0 ? '否' : '是'"
            placement="top"
          >
            <el-switch
            @change="statusChanges(props.row,'ishot')"
              v-model="props.row.ishot"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status === 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template v-slot="props">
          <el-button
            type="success"
            circle
            icon="el-icon-edit"
            size="mini"
            @click="edit(props.row)"
          ></el-button>
          <el-button
            type="danger"
            circle
            icon="el-icon-delete"
            size="mini"
            @click="del(props.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="pageChange" background layout="prev, pager, next" :total="goodsTotal" :page-size="size">
    </el-pagination>
  </div>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm'
export default {
  props: ["goodsList","goodsTotal","size"],
  methods:{
    // 监听分页按钮的点击
    // page:系统自动注入
    pageChange(page){
      // console.log(page);
      // 通知父组件显示相应的页码数据
      this.$emit('updateList',page)
    },
    // attr:要修改的属性(isnew:是否新品,ishot:是否热卖)
    statusChanges(row,attr){
      // console.log(row);
      // 请求数据列表
      // 带有图片的都要使用转为formData  
      const fd = new FormData();
      fd.append('id',row.id);
      fd.append(attr,row[attr])
      this.$http.post('/goodsedit',fd).then(res=>{
        if(res.code===200){
          return this.$success(res.msg)
        }
          this.$error(res.msg)
      })
    },
    // 编辑
    edit(row){
      // console.log(row);
      // 通知兄弟组件显示对话框,把待编辑的数据展示到对话框上
      vm.$emit('sendGoodsData',{...row})
    },
    // 删除
    del(id){
      // console.log(id);
      // 确认删除的提示框
      this.$myConfirm(()=>{
        // 发送请求
        this.$http.post('/goodsdelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg)
            // 通知父组件更新数据列表
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