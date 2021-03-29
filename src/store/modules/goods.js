// 导入数据请求方法
import {
  getGoodsList,
  getGoodsTotal
} from '../../request/goods';

// 默认导出
export default {
  // 开启独立的命名空间
  namespaced: true,
  state() {
    return {
      //    商品列表数组
      goodsList: [],
      //    商品列表总数
      goodsTotal: 0
    }
  },
  mutations:{
    //   初始化goodsList
    goodsListInit(state,list){
        state.goodsList=list
    },
    //   初始化goodsTotal
    goodsTotalInit(state,total){
        state.goodsTotal=total
    }
  },
  actions:{
    //   请求商品列表
      getGoodsListAction({commit},params){
        getGoodsList(params).then(list=>{
            // 使用commit调用同步方法goodsListInit
            commit('goodsListInit',list)
        })
      },
      getGoodsTotalAction({commit}){
        getGoodsTotal().then(total=>{
            // 使用commit调用同步方法goodsTotalInit
            commit('goodsTotalInit',total)
        })
      }
  }
}
