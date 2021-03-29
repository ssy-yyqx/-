<template>
  <el-dialog @close="reset" title="编辑" :visible.sync="info.isShow">
    <el-form ref="formRef" label-width="80px" :model="formData">
      <el-form-item label="用户ID" prop="uid">
        <el-input v-model="formData.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="注册日期" prop="addtime">
        <el-input v-model="formData.addtime" disabled>
          <!-- <template v-slot="props">
            {{props.row.addtime | dateFmt}}
          </template> -->
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button @click="submit" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      formData: {
        uid: "", //会员编号必填项
        nickname: "", //昵称
        phone: "", //手机号
        addtime: "", //注册日期
      },
    };
  },
  methods: {
    // 提交表单
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$http.post("/memberedit", this.formData).then((res) => {
            if (res.code === 200) {
              this.$success(res.msg);
              // 通知父组件更新视图
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
      // 关闭模态框
      this.info.isShow = false;
    },
    obj1(time, divider = "-") {
      const date = new Date(Number(time));
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const mm = date.getMinutes();
      const s = date.getSeconds();
      return `${y}${divider}${m}${divider}${d} ${h}:${mm}:${s}`;
    },
    // 更新formData
    editList(obj) {
      obj.addtime = this.obj1(Number(obj.addtime))
      // console.log( this.obj1(Number(obj.addtime)));
      this.formData = { ...obj };
      // console.log(this.formData);
    },
  },
};
</script>

<style scoped>
</style>