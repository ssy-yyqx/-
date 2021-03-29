import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Login=()=>import('../pages/Login.vue')
const Layout=()=>import('../pages/Layout.vue')
// 导入菜单管理组件
const Menu=()=>import('../pages/menu/Index.vue')
// 导入角色管理
const Role=()=>import('../pages/role/Index.vue')
// 导入管理员管理
const Admin=()=>import('../pages/admin/Index.vue')
// 导入分类管理
const Cate=()=>import('../pages/cate/Index.vue')
// 导入规格管理
const Specs=()=>import('../pages/specs/Index.vue')
// 导入商品管理
const Goods=()=>import('../pages/goods/Index.vue')
// 导入会员管理
const Member=()=>import('../pages/member/Index.vue')
// 导入轮播图管理
const Banner=()=>import('../pages/banner/Index.vue')
// 导入限时秒杀
const Seckill=()=>import('../pages/seckill/Index.vue')
// 404
const NotFound=()=>import('../pages/NotFound.vue')



// 导入测试组件Home
const Home=()=>import('../pages/Home.vue')



Vue.use(Router)

// 定义路由规则
const routes= [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'管理员登录'
    }
  },
  {
    path:'/',
    component: Layout,
    meta:{
      title:'小U商城后台管理系统'
    },
    redirect:'/home',
    children:[
      {
        path:'/home',
        component:Home,
        meta:{
          title:'管理中心'
        }
      },
      {
        path:'/menu',
        component:Menu,
        meta:{
          title:'菜单管理'
        }
      },
      {
        path:'/role',
        component:Role,
        meta:{
          title:'角色管理'
        }
      },
      {
        path:'/admin',
        component:Admin,
        meta:{
          title:'管理员管理'
        }
      },
      {
        path:'/category',
        component:Cate,
        meta:{
          title:'分类管理'
        }
      },
      {
        path:'/specs',
        component:Specs,
        meta:{
          title:"规格管理"
        }
      },
      {
        path:'/goods',
        component:Goods,
        meta:{
          title:"商品管理"
        }
      },
      {
        path:'/member',
        component:Member,
        meta:{
          title:'会员管理'
        }
      },
      {
        path:'/banner',
        component:Banner,
        meta:{
          title:'轮播图管理'
        }
      },
      {
        path:'/seckill',
        component:Seckill,
        meta:{
          title:'限时秒杀'
        }
      }
    ]
  },
  // 404
  {
    path:'*',
    component:NotFound,
    meta:{
      title:'404'
    }
  }
];

const router =  new Router({
    routes
})

// 路由导航守卫
router.beforeEach((to,from,next)=>{
   // 读取本地存储
   const loginInfo=JSON.parse(localStorage.getItem('loginInfo')|| '{}');
  // 如果用户访问的是非登录页面
  if(to.path!=='/login'){
    
    //  如果没有登录凭证,就重定向
     if(!loginInfo.token){
       return next('/login');
     }
     // 如果用户访问的是没有权限的
    const menusUrl = loginInfo.menus_url;
    menusUrl.push('/home')
    menusUrl.push('/')
    if(menusUrl.indexOf(to.path)===-1){
    return next('/home')
  }
  } 
  
  next();
  // 动态设置页面标题
  document.title=to.meta.title;
})

// 导出
export default router;
