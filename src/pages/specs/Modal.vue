<template>
  <el-dialog @close="reset" title="新增" :visible.sync="info.isShow">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="规格名称" prop="specsname">
            <el-input placeholder="规格名称" v-model="formData.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格可选值" prop="attrs">
            <div class="item" v-for="(item,index) in attrs" :key="index">
                <el-input v-model.trim="attrs[index]" placeholder="规格可选值"></el-input>
                <el-button v-if="index==0" @click="addAttrs" type="success" size="mini">新增</el-button>
                <el-button v-else @click="delAttrs(index)" type="danger" size="mini">删除</el-button>
            </div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-radio-group  v-model="formData.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <div slot="footer" >
      <el-button @click="reset" >取 消</el-button>
      <el-button @click="submit" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm';
export default {
    created(){
        //监听兄弟组件传递的数据
        vm.$on('sendSpecsData',(row)=>{
            // console.log(row);
            // 显示模态框
            this.info.isShow=true;
            // 显示数据
            this.formData=row
            this.attrs=row.attrs
        })
    },
    props:['info'],
    data(){
        // 自定义校验
        const validAttrs=(rule,value,callback)=>{
             // 假设表单元素都输入内容
            var flag=true;
            this.attrs.forEach(item => {
                if(item===''){
                    flag=false
                }
            }); 
            if(!flag){
                return callback(new Error('请输入规格可选值'))
            }
            // 表单校验通过
            callback()
        }
        return{
            
            // 规格可选值
            attrs:[''],
            // 表达数据模型
            formData:{
                // 规格名称
                specsname:'',
                // 规格可选值
                attrs:'',
                // 状态
                status:''
            },
            // 表单校验规则
            rules:{
                specsname:{required:true,message:'请输入规格名称',trigger:'blur'},
                status:{required:true,message:'请选择状态',trigger:'blur'},
                attrs:{validator:validAttrs}
            }
        }
    },
    methods:{
        addAttrs(){
            if(this.attrs.length>=5){
                return this.$error('最多只能添加5个')
            }
            this.attrs.push('')
        },
        // 删除
        delAttrs(index){
            // console.log(index);
            // 通过索引删除数据
            this.attrs.splice(index,1)
        },
        // 提交表单  终极校验
        submit(){
            this.$refs.formRef.validate(valid=>{
                if(valid){
                    // 提交表单数据
                    // 转换数据类型   转换成字符串
                    this.formData.attrs=this.attrs.join(',');
                    // console.log(this.formData.attrs);
                    // 发送数据请求
                    const url = this.formData.id>0 ? '/specsedit':'/specsadd'
                    this.$http.post(url,this.formData).then(res=>{
                        if(res.code===200){
                            this.$success(res.msg)
                            // 通知父组件更新列表
                            this.$emit('updateList')
                            // 重置表单
                            this.reset()
                        }else{
                            this.$error(res.msg)
                        }
                    })
                }
            })
        },
        // 重置表单
        reset(){
            // 重置数据
            this.formData={
                // 规格名称
                specsname:'',
                // 规格可选值
                attrs:'',
                // 状态
                status:''
            },
            this.attrs=['']
            // 重置表单状态
            this.$refs.formRef.resetFields()
            // 关闭对话框组件
            this.info.isShow=false
        }
    }
};
</script>

<style>
.item{
    display: flex;
    margin-bottom: 10px;
}
.item .el-button{
    margin-left: 10px;
}
</style>