<template>
  <el-dialog @close="reset" :title="formData.id>0?'编辑':'添加'" :visible.sync="info.isShow">
    <el-form ref="formRef" label-width="100px" :model="formData" :rules="rules">
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="begintime">
        <el-date-picker
          v-model="formData.begintime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          :start-placeholder="formData.begintime | dateFmt"
          :end-placeholder="formData.endtime | dateFmt"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select @change="firstChange" placeholder="请选择" v-model="formData.first_cateid">
          <el-option  v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select @change="secondChange" placeholder="请选择" v-model="formData.second_cateid">
          <el-option v-for="item in secondList" :key="item.id" :label="item.catename" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="goodsid">
        <el-select placeholder="请选择" v-model="formData.goodsid">
          <el-option v-for="item in thirdList" :key="item.id" :label="item.goodsname" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">立即添加</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </el-dialog>
</template>

<script>
import vm from '../../utils/vm'
import { mapState,mapActions } from 'vuex'
export default {
  props: ["info"],
  computed:{
    ...mapState({
      cateList:state=>state.cate.cateList
    })
  },
  created(){
    this.getCateListAction();
    // setTimeout(()=>{console.log(this.cateList);},500)
    vm.$on('sendDataSeckill',(row)=>{
      // console.log(row);
      this.formData=row;
      this.info.isShow=true
      this.firstChange(row.first_cateid,false)
      this.secondChange(row.second_cateid,false)
    })
  },
  data() {
    return {
      // 二级分类列表
      secondList:[],
      thirdList:[],
      pickerOptions: {
        shortcuts: [
          {
            text: "1天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "3天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "一周内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // value2: "",
      formData: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: "", //状态1正常2禁用
      },
      rules: {
        title: { required: true, message: "请输入名称", trigger: "blur" },
        first_cateid: {
          required: true,
          message: "请输入一级分类",
          trigger: "blur",
        },
        second_cateid: {
          required: true,
          message: "请输入二级分类",
          trigger: "blur",
        },
        status: { required: true, message: "请输入状态", trigger: "blur" },
      },
    };
  },
  // watch: {
  //   value2() {
  //     this.formData.begintime = Date.parse(this.value2[0]);
  //     this.formData.endtime = Date.parse(this.value2[1]);
  //     // console.log(this.formData.begintime,this.formData.endtime);
  //   },
  // },
  methods: {
    ...mapActions('cate',['getCateListAction']),
    submit() {
      // console.log(this.formData);
      const begintime1 =Date.parse(this.formData.begintime[0])
      this.formData.endtime =Date.parse(this.formData.begintime[1])
      this.formData.begintime=begintime1
      // console.log(this.formData);
      this.$refs.formRef.validate(valid=>{
        if(valid){
          const url = this.formData.id>0?'/seckedit':'/seckadd'
          this.$http.post(url,this.formData).then(res=>{
            // console.log(this.formData);
            if(res.code===200){
              this.$success(res.msg);
              // 通知父组件更新视图
              this.$emit('updateList')
              this.reset()
            }else{
              this.$error(res.msg)
            }
          })
        }
      })
    },
    reset(){
      this.formData={
         title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: "", //状态1正常2禁用
      }
      // 手动重置
      this.formData.endtime='',
      this.formData.begintime='',
      this.secondList=[],
      this.thirdList=[],
      this.info.isShow=false,
      this.$refs.formRef.resetFields();

    },
    // 一级分类
    firstChange(id,flag=true){
      // console.log(id,"ddd");/
      const index = this.cateList.findIndex(item=>item.id===id);
      // console.log(index); 
      // 点击添加时触发
      if(flag){
         this.secondList=[];
         this.formData.second_cateid='';
      }
     this.secondList=this.cateList[index].children
    },
    // 二级分类
    secondChange(){
      this.$http.get('/getindexgoods').then(res=>{
        if(res.code===200){
          // console.log(res.list);
          this.thirdList=res.list[2].content
          // console.log(this.thirdList);
        }else{
          if(flag){
         this.thirdList=[];
         this.formData.goodsid=''
      }
        }
      })
    }
  },
};
</script>

<style>
</style>