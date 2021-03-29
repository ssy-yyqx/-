<template>
  <div class="login-container">
    <div class="login-box">
      <h3 class="login-title">小U商城后台管理系统</h3>

        <!-- :model="fromData": 和表单元素进行双向数据绑定,是一个数据集合对象
             :rules="rules":  表单校验规则对象
        -->
      <el-form
        :model="formData"
        :rules="rules"
        ref="loginRef"
        class="login-form">
        <!-- prop: 指定错误消息的显示位置 -->
        <el-form-item  prop="username">
          <el-input type="text" placeholder="请输入登录账号" v-model="formData.username" autocomplete="off">
              <template slot="prepend">
                  <i class="el-icon-user-solid"></i>
              </template>
          </el-input>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input type="password" show-password placeholder="请输入密码" v-model="formData.password" autocomplete="off">
              <template slot="prepend">
                  <i class="el-icon-lock"></i>
              </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="btn-login" type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        formData: {
          username: '',
          password: ''
        },
        // 表单校验规则
        rules: {
          // require:true  表示必填项   trigger:'blur'当表单元素失去焦点时进行验证
          username: {required:true,message:'请输入登录账号',trigger:'blur'},
          password: {required:true,message:'请输入登录密码',trigger:'blur'},
        }
      };
    },
    methods: {
      submitForm(formName) {
        // validate: 进行终极的表单校验 
        // valid: 系统形参,true表单校验通过   false表单校验不通过
        this.$refs.loginRef.validate(valid => {
          if (valid) {
            console.log(this.formData);
            this.$http.post('/userlogin',this.formData).then(res=>{
              // console.log(res)
              if(res.code===200){
                // 1.将用户相关信息存储到本地
                localStorage.setItem('loginInfo',JSON.stringify(res.list));
                // 2.给出成功提示
                this.$success(res.msg);
                // 3.跳转到管理中心
                this.$router.push('/')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
};
</script>

<style scoped>
.login-container {
  /* vh: viewport height, 是一个相对单位;  100vh=屏幕高度   1vh=1/100的屏幕高度 */
  height: 100vh;
  background: url("../assets/img/loginbg.jpeg");
  background-size: 100% 100%;
  display: flex;
  /* 在主轴的对齐方式 */
  justify-content: center;
  /* 在交叉轴的对齐方式 */
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  margin: auto;
  border-radius: 4px;
  padding: 0 30px;
}
.login-title {
  margin-top: 40px;
  color: #409eff;
  text-align: center;
}
.btn-login{
  width: 100%;
}
.login-form{
    margin-top: 40px;
}
</style>