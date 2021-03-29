// 导入数据请求方法
import { getSeckill } from '../../request/seckill'

// 子模块
export default {
    // 开启独立的命名空间
    namespaced:true,
    state(){
        return {
            getSeckillList:[]
        }
    },
    mutations:{
        // 初始化getSeckillList
        getSeckillListInit(state,list){
            // console.log(list);
            state.getSeckillList = list
        }
    },
    actions:{
        getSeckillListAction({commit}){
            // 使用commit调用同步方法getSeckillListInit
            getSeckill().then(list=>{
                if(list){
                    commit('getSeckillListInit',list)
                }
            })
        }
    }
}