// 1.导入
import Vue from 'vue'
import Vuex from 'vuex'


// 2.注册
Vue.use(Vuex);


// 导入子模块
import menu from './modules/menu';
// 导入角色列表的子模块
import role from './modules/role';
// 导入管理员管理的子模块
import admin from './modules/admin';
// 导入分类管理的子模块
import cate from './modules/cate';
// 导入规格管理的子模块
import specs from './modules/specs';
// 导入商品管理的子模块
import goods from './modules/goods';
// 导入会员管理的子模块
import member from './modules/member';
// 导入轮播图管理的子模块
import banner from './modules/banner';
// 导入轮播图管理的子模块
import seckill from './modules/seckill';


// 3.创建数据存储对象
const store = new Vuex.Store({
    state:{
        // 导航菜单数组
        menuList:[],
        username:''
    },
    mutations:{
        // 初始化menuList
        menuListInit(state){
            // 读取本地存储
            const loginInfo = JSON.parse(localStorage.getItem('loginInfo')||'{}')
            // 更新数据
            state.menuList=loginInfo.menus
        },
        usernameInit(state){
            // 读取本地存储
            const loginInfo = JSON.parse(localStorage.getItem('loginInfo')||'{}')
            // 更新数据
            state.username=loginInfo.username
        }
    },
    getter:{},
    actions:{},
    modules:{
        // 挂载子模块
        menu,
        role,
        admin,
        cate,
        specs,
        goods,
        member,
        banner,
        seckill
    }
});


// 4.导出
export default store;