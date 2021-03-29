// 导入数据请求方法
import { getAdminList,getAdminTotal } from '../../request/admin';

export default {
    // 开启独立的命名空间
    namespaced:true,
    state(){
        return{
            // 管理员列表
            adminList:[],
            // 管理员条总数
            adminTotal:0
        }
    },
    mutations:{
        // 初始化adminList
        adminListInit(state,list){
            state.adminList=list
        },
        // 初始化adminTotal
        adminTotalInit(state,total){
            state.adminTotal=total
        }
    },
    actions:{
        // params={page:'页码',size:'每页显示数据条数'}
        getAdminListAction({commit},params){
            getAdminList(params).then(list=>{
                // 通过commit调用同步方法adminListInit实现更新数据
                if(list){
                    commit('adminListInit',list);
                }
                
            })
        },
        getAdminTotalAction({commit}){
            getAdminTotal().then(total=>{
                // console.log(total,111);
                // 通过commit调用同步方法adminListInit实现更新数据
                if(total){
                    commit('adminTotalInit',total);
                }
                
            })
        }
    }
}