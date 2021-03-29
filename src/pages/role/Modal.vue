<template>
    <!-- close:点击叉号时关闭模态框,重置表单 -->
  <el-dialog @close="reset" :title="formData.id>0?'编辑':'新增'" :visible.sync="info.isShow">
    <el-form label-width="80px"
        :model="formData"
        :rules="rules"
        ref="formRef">
        <el-form-item label="角色名称" prop="rolename">
            <el-input placeholder="角色名称" v-model="formData.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="menus">
            <!-- default-expand-all:默认展开所有节点 -->
            <el-tree
                ref="treeRef"
                :data="menuList"
                show-checkbox
                node-key="id"
                default-expand-all
                :props="defaultProps">
            </el-tree>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
            <el-radio-group v-model="formData.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit" >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState,mapActions } from 'vuex';
// 导入事件中心
import vm from '../../utils/vm';
export default {
    // 接收父组件传递的数据
    props:['info'],
    created(){
        // 不管有没有数据都初始化数据 menuList
        this.getMenuListAction(),
        // 监听自定义事件
        vm.$on('sendRoleData',(obj)=>{
            // console.log(obj,111);
            // 1.更新this.formData
            this.formData=obj;
            // 2.显示对话框组件
            this.info.isShow=true;
            // 3.勾选当前角色操作权限
            setTimeout(()=>{
                this.$refs.treeRef.setCheckedKeys(this.formData.menus.split(',')); 
            },50)
            
        })
    },
    computed:{
        // 拿到菜单管理的数据
        ...mapState({
            menuList:state=>state.menu.menuList
        })
    },
    methods:{
        ...mapActions('menu',['getMenuListAction']),
        // 表单提交
        submit(){
            // 终极的表单校验的过程
            this.$refs.formRef.validate(valid=>{
                if(valid){
                    // 1.获取用户勾选的节点  join把数组使用,逗号分隔开
                    const keys=this.$refs.treeRef.getCheckedKeys().join(',')
                    // 2.手动更新formData.menus
                    this.formData.menus=keys;
                    // 3.提交数据
                    const url=this.formData.id>0?'/roleedit':'/roleadd'
                    this.$http.post(url, this.formData).then(res=>{
                        if(res.code===200){
                            this.$success(res.msg)
                            // 通过自定义事件通知父组件更新数据列表
                            this.$emit('updateList')
                            // 重置数据
                            this.reset()
                            return false;
                        } 
                        this.$error(res.msg)
                    })
                }
            });
        },
        // 数据重置的方法
        reset(){
            // 1.重置表单
            this.formData={
                rolename:'',    // 角色名称
                menus:'',       // 角色权限
                status:''      // 状态1正常2禁用
            }
            // 清空树形组件的勾选项   setCheckedKeys:设置勾选项(需要数组作为参数)  getCheckedKeys:获取勾选项
            this.$refs.treeRef.setCheckedKeys([]);
            // 2.关闭对话框
            this.info.isShow=false;
        }
    },
    data(){
        // 自定义表单校验规则方法  只能在data中使用
        var validMenus = (rule, value, callback) => {
        const keys=this.$refs.treeRef.getCheckedKeys();
        if (keys.length<=0) {
          return  callback(new Error('请选择操作权限'));
        } 
          // 表示表单校验通过  
          callback();
      };
        return {
            isShow:true,
            data: [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                id: 9,
                label: '三级 1-1-1'
                }, {
                id: 10,
                label: '三级 1-1-2'
                }]
            }]
            }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
            }, {
            id: 3,
            label: '一级 3',
            children: [{
                id: 7,
                label: '二级 3-1'
            }, {
                id: 8,
                label: '二级 3-2'
            }]
            }],
            // 属性控件的相关属性值
            defaultProps: {
            children: 'children',
            label: 'title'
            },
            // 和表单元素进行双向绑定
            formData:{
                id:0,
                rolename:'',    // 角色名称
                menus:'',       // 角色权限
                status:''      // 状态1正常2禁用
            },
            // 表单校验规则
            rules:{
                rolename:{required:true,message:'请输入角色名称',trigger:'blur'},
                status:{required:true,message:'请选择状态',trigger:'blur'},
                // 自定义表单校验
                menus:{validator:validMenus,trigger:'blur'}
            }
        }
    }
}

</script>

<style>
</style>