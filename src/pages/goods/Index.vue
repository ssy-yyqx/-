<template>
  <el-card>
      <el-button @click="info.isShow=!info.isShow" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
      <el-divider />
      <!-- 调用List组件 -->
      <List @updateList="updateList" :goodsList="goodsList" :goodsTotal="goodsTotal" :size="size"/>
      <Modal :info="info" @updateList="updateList"/>
  </el-card>
</template>

<script>
// 导入vuex
import { mapState,mapActions } from 'vuex';
// 导入子组件
import List from './List';
import Modal from './Modal';
export default {
    // 注册子组件
    components:{
        List,
        Modal
    },
    data(){
        return{
            page:1,
            size:5,
            info:{
                isShow:false
            }
        }
    },
    created(){
        this.getGoodsListAction({page:this.page,size:this.size}),
        this.getGoodsTotalAction()
    },
    
    // computed: Object.assign({
    //     // 自己的计算属性
    // },mapState({
    //     goodsList:state=>state.goods.goodsList
    // })),
    computed:{
        ...mapState({
            goodsList:state=>state.goods.goodsList,
            goodsTotal:state=>state.goods.goodsTotal
        })
    },
    methods:{
        ...mapActions('goods',['getGoodsListAction','getGoodsTotalAction']),
        // 自定义事件的处理函数
        updateList(page){
            // console.log(page);
            // console.log(page);
            // 更新页码
            if(page){
                this.page=page
            }
            // 更新数据列表
            this.getGoodsListAction({page:this.page,size:this.size});
            this.getGoodsTotalAction()
        }
    }
    
}
</script>

<style>

</style>