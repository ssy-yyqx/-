<template>
  <el-dialog @close="resetForm" :title="formData.id>0?'编辑':'新增'" :visible.sync="info.isShow">
    <el-form ref="menuForm" :model="formData" :rules="rules" label-width="60px">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上级" v-if="formData.type===2" prop="pid">
         <el-select placeholder="请选择" v-model="formData.pid">
             <el-option :value="0" label="请选择"></el-option>
            <el-option
                v-for="item in menuList"
                :key="item.id"
                :label="item.title"
                :value="item.id">
            </el-option>
  </el-select>
      </el-form-item>

      <el-form-item label="名称" prop="title">
          <el-input placeholder="菜单标题" v-model="formData.title"></el-input>
      </el-form-item>

      <el-form-item label="图标" v-if="formData.type===1"  prop="icon">
          <el-input placeholder="图标" v-model="formData.icon"></el-input>
      </el-form-item>

      <el-form-item label="地址" v-if="formData.type===2" prop="url">
          <el-input placeholder="地址" v-model="formData.url"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
      ...mapState({menuList:state=>state.menu.menuList})
  },
  // 接收父组件传递过来的数据
  props: ["info"],
  data() {
    return {
      // 和表单元素进行绑定  
      formData: {
        id:0,
        pid:0,
        title:'',
        icon:'',
        status:'',
        type:1,
        url:''
      },
      // 表单校验规则
      rules:{
          title:{ required:true, message:'请输入名称',trigger:'blur' },
          status:{ required:true, message:'请选择状态',trigger:'blur' }
      }
    };
  },

  methods:{
      // 表单提交的方法
      submit(){
          this.$refs.menuForm.validate(valid=>{
              if(valid){
                const url = this.formData.id>0?'/menuedit':'/menuadd';
                //   console.log('ok');
                // 提交表单
                this.$http.post(url,this.formData).then(res=>{
                    if(res.code===200){
                        this.$success(res.msg)
                        // 1.关闭对话框组件
                        this.info.isShow=false;
                        // 2.更新数据列表
                        this.$emit('updateList')
                    }else{
                        this.$error(res.msg)
                    }
                })
              }
          })
      },
      resetForm(){
          // 重置表单  
          this.$refs.menuForm.resetFields();
          this.formData={
            pid:0,
            title:'',
            icon:'',
            status:'',
            type:1,
            url:''
          }
      },
      // 更新formData
      setFormData(obj){
        this.formData={...obj}
      }
  }
};
</script>

<style>
</style>