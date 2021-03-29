<template>
  <el-dialog @close="reset" :title="this.formData.id>0?'编辑':'新增'" :visible.sync="info.isShow">
    <el-form ref="formRef" label-width="100px" :model="formData" :rules="rules">
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片" prop="img">
        <el-upload
          action="#"
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :limit="1"
          :on-exceed="limitChange"
          :file-list="imgList"
          :on-change="imgChange"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm'
export default {
  props: ["info"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgList: [],
      formData: {
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: "", //状态1正常2禁用
      },
      //   校验
      rules: {
        title: { required: true, message: "请输入商品名称", trigger: "blur" },
        status: { required: true, message: "请输入状态", trigger: "blur" },
      },
    };
  },
  created(){
    vm.$on('sendDataBanner',(row)=>{
      // console.log(row);
      // 将待编辑的内容赋值给表单
      this.formData=row;
      // 显示模态框
      this.info.isShow=true
      // 手动触发
      this.imgList=row.img !== '' ? [{url: this.$imgBaseUrl + row.img }] : [];

    })
  },
  methods: {
    // 照片上传相关事件   预览事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提示用户图片只能上传一张
    limitChange() {
      this.$error("只能上传一张图片");
    },
    // 监听用户选择的图片
    imgChange(file) {
      // console.log(flie);
      this.formData.img = file.raw;
    },
    // 表单提交
    submit(){
        // 终极校验
        this.$refs.formRef.validate(valid=>{
            if(valid){
                // 转换成formData类型
                const fd = new FormData();

                for(let key in this.formData){
                    fd.append(key,this.formData[key])
                }
                const url = this.formData.id>0?'/banneredit':'/banneradd';
                // 发送数据请求
                this.$http.post(url,fd).then(res=>{
                    if(res.code===200){
                        this.$success(res.msg)
                        // 更新视图列表  通知父组件
                        this.$emit('updateList')
                        // 清空表单
                        this.reset()
                    }else{
                        this.$error(res.msg)
                    }
                })
                console.log(fd);
            }
        })
    },
    // 清空表单
    reset(){
        this.formData={
             title: "", //轮播图名称
            img: "", //图片(文件)
            status: "", //状态1正常2禁用
        }
        // 手动清空图片
        this.imgList=[];
        // 手动清空状态
        this.$refs.formRef.resetFields();
        // 隐藏对话框
        this.info.isShow=false
    }
  },
};
</script>

<style>
</style>