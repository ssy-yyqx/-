// 导入数据请求方法
import { getRoleList } from '../../request/role';
// 子模块
export default {
    // 开启独立命名空间
    namespaced:true,
    state(){
        return {
            // 角色列表
            roleList:[]
        }
    },
    // 同步
    mutations:{
        // 初始化角色列表
        // state: 系统自动注入的参数
        // list: 额外参数(是异步action通过数据接口获取的角色列表)
        roleListInit(state,list){
            state.roleList=list
        }
    },
    // 异步
    actions:{
        getRoleListAction({commit}){
            // 调用getRoleList
            getRoleList().then(res=>{
               if(res){
                    // 通过commit调用roleListInit同步方法
                    commit('roleListInit',res);
               }
            })
        }
    }
}