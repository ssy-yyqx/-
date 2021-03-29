// 全部导入
import Vue from 'vue';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注册
Vue.use(element);

// 封装一个成功提示
Vue.prototype.$success=function(message){
    this.$message({
        type:'success',
        message
    })
}



// 封装一个失败提示
Vue.prototype.$error=function(message){
    this.$message({
        type:'error',
        message
    })
}   



Vue.prototype.$myConfirm=function(callback){
    this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //   console.log('ok');
        callback && callback()
      }).catch(() => {
      });
}