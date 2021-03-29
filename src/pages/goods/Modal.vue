<template>
  <el-dialog
    @close="reset"
    :title="formData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
    width="100%"
    
  >
    <el-form ref="formRef" label-width="100px" :model="formData" :rules="rules">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select @change="firstCateList" v-model="formData.first_cateid">
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :value="item.id"
                :label="item.catename"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="second_cateid">
            <el-select v-model="formData.second_cateid">
              <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :value="item.id"
                :label="item.catename"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname">
            <el-input label="商品名称" v-model="formData.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="img">
            <el-upload
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :auto-upload="false"
              :limit="1"
              :on-exceed="limitTips"
              :on-change="imgChange"
              :file-list="imgList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input label="商品价格" v-model="formData.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input
              label="市场价格"
              v-model="formData.market_price"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="specsid">
            <el-select @change="specsChange" v-model="formData.specsid">
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性值" prop="specsattr">
            <el-select v-model="formData.specsattr" multiple>
              <el-option
                v-for="(item, index) in specsAttrs"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品" prop="isnew">
            <el-radio-group v-model="formData.isnew">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖" prop="ishot">
            <el-radio-group v-model="formData.ishot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="second">
          <el-form-item prop="description" label-width="0">
            <vueWangeditor
              ref="description"
              v-model="formData.description"
              id="description"
              width="100%"
              height="300"
              style="height: 400px"
            />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入vue-wangeditor
import vueWangeditor from "vue-wangeditor";
// 导入vuex辅助方法
import { mapState, mapActions } from "vuex";
// 导入事件中心
import vm from "../../utils/vm";
export default {
  computed: {
    ...mapState({
      // 一级分类列表
      cateList: (state) => state.cate.cateList,
      // 商品规格列表
      specsList: (state) => state.specs.specsList,
    }),
  },
  created() {
    // 商品分类列表初始化
    this.getCateListAction();
    // 商品规格列表初始化
    this.getSpecsListAction();
    // 监听兄弟组件自定义事件
    vm.$on("sendGoodsData", (row) => {
      // console.log(row,99);
      // 若下拉框启用了多选,则需要提供数组格式
      row.specsattr = row.specsattr.split(",");
      this.formData = row;
      // console.log(this.formData,555);
      this.info.isShow = true;
      // 手动设置富文本编辑器内容
      // 将某个操作延迟到视图渲染完毕之后
      // this.$nextTick(()=>{
      // this.$refs.description.setHtml(obj.description)

      // })
      setTimeout(() => {
        this.$refs.description.setHtml(row.description);
      }, 500);
      // 手动触发一级分类change事件回调函数
      this.firstCateList(row.first_cateid, false);
      // 手动触发商品规格值
      this.specsChange(row.specsid, false);
      // 手动更新商品预览数组
      this.imgList = row.img !== "" ? [{ url: this.$imgBaseUrl + row.img }] : [];
    });
  },

  components: {
    vueWangeditor,
  },
  props: ["info"],
  data() {
    // 自定义表单校验
    const validDesc = (rule, value, callback) => {
      // console.log(this.$refs.description.getHtml());
      // 表单校验不通过
      if (this.$refs.description.getHtml() === "<p><br></p>") {
        return callback(new Error("请输入商品描述"));
      }
      // 表单校验通过
      callback();
    };
    return {
      // 图片预览
      dialogVisible: false,
      dialogImageUrl: "",
      activeName: "first",
      // 商品图片预览数组
      imgList: [],
      // 二级分类列表
      secondCateList: [],
      // 规格属性值
      specsAttrs: [],
      //   和表单进行双向数据绑定
      formData: {
        first_cateid: "", //一级分类编号 (必须)
        second_cateid: "", //二级分类编号(必须)
        goodsname: "", //商品名称(必须)
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号 (必须)
        specsattr: "", //商品规格属性 (必须)
        isnew: "", //是否新品 1表示新品
        ishot: "", //是否热卖推荐 1表示热卖
        status: "", //状态1正常2禁用
      },
      // 表单校验规则
      rules: {
        first_cateid: { required: true, trigger: "blur", message: "请选择" },
        second_cateid: { required: true, trigger: "blur", message: "请选择" },
        goodsname: { required: true, trigger: "blur", message: "请输入" },
        price: { required: true, trigger: "blur", message: "请输入" },
        market_price: { required: true, trigger: "blur", message: "请输入" },
        description: { validator: validDesc, trigger: "blur" },
        specsid: { required: true, trigger: "blur", message: "请选择" },
        specsattr: { required: true, trigger: "blur", message: "请选择" },
        isnew: { required: true, trigger: "blur", message: "请选择" },
        ishot: { required: true, trigger: "blur", message: "请选择" },
        status: { required: true, trigger: "blur", message: "请选择" },
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    ...mapActions("cate", ["getCateListAction"]),
    ...mapActions("specs", ["getSpecsListAction"]),
    // 监听获取一级分类的id
    firstCateList(id, flag = true) {
      // console.log(id);
      // 通过id查找索引
      const index = this.cateList.findIndex((item) => item.id === id);
      // console.log(index);
      // console.log(this.secondCateList);
      if (flag) {
        // 更新二级分类列表数据
        this.formData.secondCateList = [];
      }
      // 更新二级分类列表
      this.secondCateList = this.cateList[index].children;
    },
    // 监听商品规格列表
    // 区分当前方法是手动调用的还是鼠标点击的
    // flag=true  鼠标点击
    // flag=false  手动调用
    specsChange(id, flag = true) {
      // console.log(id,'666');
      // 通过id查找索引
      // console.log(this.specsList,'0000');
      const index = this.specsList.findIndex((item) => item.id === id);
      // console.log(index,'ttt');
      // 更新商品规格列表
      this.specsAttrs = this.specsList[index].attrs;
      // 鼠标点击下拉框时
      if (flag) {
        // 重置默认的规格属性值
        this.formData.specsattr = [];
      }
    },
    // 照片上传相关事件   预览事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提示用户只能上传一张图片
    limitTips() {
      this.$error("此处只能上传一张图片");
    },
    // 监听用户选择的图片
    imgChange(file) {
      // console.log(flie);
      this.formData.img = file.raw;
    },
    // 表单提交
    submit() {
      // 终极校验
      // 手动同步富文本编辑器的内容
      this.formData.description = this.$refs.description.getHtml();
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // console.log(this.formData);
          
          // 发请求,提交数据
          const fd = new FormData();
          // 删除多余参数
          delete this.formData.secondCateList;
          delete this.formData.firstcatename;
          delete this.formData.secondcatename;
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          // console.log(fd,"ooo");

          // console.log(fd);
          const url = this.formData.id>0?'/goodsedit':'/goodsadd'
          this.$http.post(url, fd).then((res) => {
            if (res.code === 200) {
              this.$success(res.msg);
              // 通知父组件更新列表
              this.$emit("updateList");
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
      // 重置表单数据
      this.formData = {
        first_cateid: "", //一级分类编号 (必须)
        second_cateid: "", //二级分类编号(必须)
        goodsname: "", //商品名称(必须)
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号 (必须)
        specsattr: "", //商品规格属性 (必须)
        isnew: "", //是否新品 1表示新品
        ishot: "", //是否热卖推荐 1表示热卖
        status: "", //状态1正常2禁用
      };
      // 重置状态
      this.$refs.formRef.resetFields();
      // 清空富文本编译器
      this.$refs.description.setHtml("");
      // 隐藏对话框组件
      this.info.isShow = false;
      // 删除图片预览
      this.imgList=[]
    },
  },
};
</script>

<style>
</style>