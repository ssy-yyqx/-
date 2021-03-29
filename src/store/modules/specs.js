//按需导入数据请求
import { getSpecsList, getSpecsTotal } from '../../request/specs';

// 默认导出
export default {
    // 开启命名空间
    namespaced:true,
    state(){
        return{
            // 规格列表
            specsList:[],
            // 规格总条数
            specsTotal:0
        }
    },
    mutations:{
        // 初始化specsList
        specsListInit(state,list){
            state.specsList=list
        },
        // 初始化specsTotal
        specsTotalInit(state,count){
            state.specsTotal=count
        },
    },
    actions:{
        // 请求规格列表
        getSpecsListAction({commit},params){
            getSpecsList(params).then(list=>{
                if(list){
                    // 通过commit调用同步方法specsListInit
                    commit('specsListInit',list)
                }
            })
        },
        // 请求规格总数
        getSpecsTotalAction({commit}){
            getSpecsTotal().then(count=>{
                if(count){
                    // 通过commit调用同步方法specsListInit
                    commit('specsTotalInit',count)
                }
            })
        }
    }
}