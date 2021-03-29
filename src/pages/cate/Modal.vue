<template>
  <el-dialog @close="reset" :title="formData.id>0?'编辑':'新增'" :visible.sync="info.isShow">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="上级" prop="pid">
        <el-select v-model="formData.pid">
          <el-option :value="0" label="顶级分类"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="catename">
        <el-input placeholder="名称" v-model="formData.catename"></el-input>
      </el-form-item>
      <!-- v-if="formData.pid!==0":当pid不为0时显示图片 -->
      <el-form-item label="图片" prop="img" v-if="formData.pid !== 0">
        <!-- 
                action:指定图片上传的数据接口
                auto-upload:是否自动上传图片,默认自动上传
                on-preview:图片预览事件
                on-change:当用户选择文件的时候,自动触发
                limit:限制最大上传个数
                on-exceed:文件限制时的构造函数
                file-list:设置默认需要展示的图片列表,需要一个数组 [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
             -->
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :auto-upload="false"
          :on-change="fileChange"
          :limit="1"
          :on-exceed="limitTips"
          :file-list="fileList"
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

// 导入辅助方法
import { mapState } from "vuex";
// 导入事件中心
import vm from '../../utils/vm';
export default {
  props: ["info"],
  computed: {
    // 获取数据列表
    ...mapState({
      cateList: (state) => state.cate.cateList,
    }),
  },
  created(){
    // 事件监听
    vm.$on('sendCateData',(row)=>{
      // console.log(row);
      // 1.显示对话框组件
      this.info.isShow=true;
      // 2.更新数据formData 
      this.formData=row
      // console.log(this.formData);
      // 更新fileList
      this.fileList=[{url:this.$imgBaseUrl+row.img}]
    })
  },
  data() {
    return {
      isShow: true,
      // 上传组件所需属性
      dialogImageUrl: "",
      dialogVisible: false,
      // 点击编辑时图片默认显示预览
      fileList:[],
      // 和表单进行数据绑定
      formData: {
        pid: 0, // 上级分类编号
        catename: "", // 商品分类名称
        img: "", // 图片(文件，一般用于二级分类)
        status: "", // 状态1正常2禁用
      },
      // 进行表单校验
      rules: {
        pid: { required: true, message: "请选择上级", trigger: "blur" },
        catename: {
          required: true,
          message: "请输入分类名称",
          trigger: "blur",
        },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  methods: {
    //  上传组件相关方法
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 监听用户选择文件
    // file:系统自动注入,表示用户选择的文件对象
    fileChange(file) {
      // console.log(file);
      // 手动更新数据
      this.formData.img = file.raw;
    },
    // 提交方法
    submit() {
      // validate终极校验
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // console.log('ok');
          // 将this.formData数据对象,转换成FormData对象
          // 创建FormData实例对象
          const fd = new FormData();
          // 删除多余数据:删除对象的某个属性
          delete this.formData.children;
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          // console.log(this.formData);
          const url = this.formData.id>0?"/cateedit":"/cateadd"
          this.$http.post(url, fd).then((res) => {
            if (res.code === 200) {
              this.$success(res.msg);
              // 更新数据列表:通知父组件更新数据列表
              this.$emit("updateList");
              // 关闭模态框
              // 重置表单
              this.reset();
              
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    // 重置表单
    reset() {
      //   关闭模态框
      this.info.isShow = false;
      // 重置表单
      this.formData = {
        pid: 0, // 上级分类编号
        catename: "", // 商品分类名称
        img: "", // 图片(文件，一般用于二级分类)
        status: "", // 状态1正常2禁用
      };
      // 重置表单状态
      this.$refs.formRef.resetFields();
    },
    // 图片数量超过上限时的提示
    limitTips(){
        this.$error('最多只能上传一张')
    }
  },
};
</script>

<style>
</style>