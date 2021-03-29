<template>
  <fullscreen ref="fullscreen">
    <el-container>
      <el-aside :width="asideWidth">
        <h3 class="logo-text">小U商城后台</h3>
        <!-- 主导航 -->
        <!-- collapse:是否水平折叠收起菜单 -->
        <!-- unique-opened:每次只打开一个下拉框 -->
        <el-menu
          unique-opened
          :collapse-transition="false"
          :collapse="collapse"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333"
          text-color="#fff"
          active-text-color="#fff"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>

          <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/menu">
            <span slot="title">菜单管理</span> -->
          <!-- <router-link tag="li" to="/menu">
              <span>菜单管理</span>
            </router-link> -->
          <!-- </el-menu-item>
          <el-menu-item index="/role">
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/admin">
          <span slot="title">管理员管理</span>
        </el-menu-item>
        </el-submenu> -->

          <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item index="/cate">
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/specs">
            <span slot="title">规格管理</span>
          </el-menu-item>
          <el-menu-item index="/goods">
          <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="3-4">
          <span slot="title">轮播图管理</span>
          </el-menu-item>
          <el-menu-item index="3-5">
          <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="3-6">
          <span slot="title">活动管理</span>
          </el-menu-item>
        </el-submenu> -->

          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="val.url"
              v-for="val in item.children"
              :key="val.id"
            >
              <span slot="title">{{ val.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <el-button
            @click="collapse = !collapse"
            type="primary"
            icon="el-icon-s-fold"
            size="mini"
          ></el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>管理中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button
            @click="$router.back()"
            icon="el-icon-back"
            size="mini"
            circle
          ></el-button>

          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><div>
                  <i class="el-icon-user"></i> 个人信息
                </div></el-dropdown-item
              >
              <el-dropdown-item
                ><div @click="fullscreen">
                  <i class="el-icon-full-screen"></i> 全屏预览
                </div></el-dropdown-item
              >
              <el-dropdown-item
                ><div @click="logout">
                  <i class="el-icon-switch-button"></i> 安全退出
                </div></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <!-- 二级路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
// 导入辅助方法
import { mapState, mapMutations } from "vuex";
import fullscreen from "vue-fullscreen";
// 注册
import Vue from "vue";
Vue.use(fullscreen);
export default {
  data() {
    return {
      // false:非折叠 226   true:折叠 64
      collapse: false,
    };
  },
  computed: {
    ...mapState(["menuList","username"]),
    asideWidth() {
      return this.collapse ? "64px" : "226px";
    },
  },

  created() {
    // 初始化数据
    this.menuListInit();
    this.usernameInit();
  },
  methods: {
    ...mapMutations(["menuListInit","usernameInit"]),
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath); 
    },
    // 安全退出
    logout() {
      // console.log('ok');
      // 删除本地存储的登录凭证
      localStorage.removeItem("loginInfo");
      // 给出用户反馈
      this.$success("退出成功");
      // 页面重定向
      this.$router.push("/login");
    },
    // 全屏
    fullscreen(){
      // 通过refs调用全屏显示的组件
      this.$refs.fullscreen.toggle()
    }
  },
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}

/* logo */
.logo-text {
  background-color: #444;
  color: #fff;
  line-height: 60px;
  font-weight: normal;
  /* 文字间距 */
  letter-spacing: 4px;
  text-align: center;
  /* 取消自动换行 */
  white-space: nowrap;
}

/* 导航 */
.el-menu {
  height: calc(100vh - 60px);
  border-right: none;
}
/* 导航高亮 */
.is-active {
  background-color: #409eff !important;
}

/* 页面头部 */
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
}
.el-header button {
  height: 26px;
}
.el-breadcrumb {
  margin: 0 20px;
}
.el-dropdown {
  position: absolute;
  right: 20px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>