// 按需导入请求方法
import {getCateList} from '../../request/cate';

export default{
    // 开启独立的命名空间
    namespaced:true,
    state(){
        return{
            // 分类列表
            cateList:[]
        }
    },
    mutations:{
        // 初始化cateList数据
        cateListInit(state,list){
            state.cateList=list;
        }
    },
    actions:{
        // 获取分类列表
        getCateListAction({commit}){
            getCateList().then(list=>{
                if(list){
                    // 使用commit调用同步方法cateListInit
                    commit('cateListInit',list)
                }
            })
        }
    }

}