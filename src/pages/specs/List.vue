<template>
  <div>
    <el-table :data="specsList" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格可选值">
        <template v-slot="props">
          <el-tag
            type="success"
            v-for="(item, index) in props.row.attrs"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status === 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="props">
          <el-button
            size="mini"
            type="success"
            circle
            icon="el-icon-edit"
            @click="edit(props.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-delete"
            @click="del(props.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="specsTotal"
      :page-size="size"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// 导入事件中心
import vm from "../../utils/vm";
export default {
  props: ["specsList", "specsTotal", "size", "page"],
  methods: {
    // 监听分页按钮的点击,page为页码
    pageChange(page) {
      //   console.log(page);
      // 通过自定义事件让父组件更新页码
      this.$emit("sendData", page);
    },
    // 监听
    edit(row) {
      // console.log(row);
      // 显示模态框,显示数据 向兄弟组件传递数据
      vm.$emit("sendSpecsData", { ...row });
    },
    // 删除
    del(id) {
      // console.log(id);
      // 调用确认删除的方法
      this.$myConfirm(() => {
        // 请求数据
        this.$http.post("/specsdelete", { id }).then((res) => {
          if (res.code === 200) {
            this.$success(res.msg);
            this.$emit("updateList");
            // 更新列表   通知父组件更新数据列表
            // if (
            //   Math.ceil(this.specsTotal / this.size) === this.page &&
            //   this.specsTotal % this.size === 1
            // ) {
            //   // 页码减1
            //   this.page -= 1;
            // }
          } else {
            this.$error(res.msg);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 0 5px;
}
</style>