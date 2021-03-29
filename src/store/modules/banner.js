// 导入数据请求方法
import { getBannerList } from '../../request/banner'

export default{
    // 开启独立命名空间
    namespaced:true,
    state(){
        return {
            bannerList:[]
        }
    },
    mutations:{
        // 初始化bannerList
        bannerListInit(state,list){
            state.bannerList=list
        }
    },
    actions:{
        bannerListAction({commit}){
            getBannerList().then(list=>{
                if(list){
                    commit('bannerListInit',list)
                }
            })
        }
    }
}