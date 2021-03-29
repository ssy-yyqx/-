<template>
  <el-table :data="seckillList" style="width: 100%">
    <el-table-column prop="title" label="活动名称" min-width="180" align="center" > </el-table-column>
    <el-table-column prop="begintime" label="开始时间" min-width="180" align="center">
        <template v-slot="props">
            {{props.row.begintime | dateFmt}}
        </template>
    </el-table-column>
    <el-table-column prop="endtime" label="结束时间" min-width="180" align="center">
        <template v-slot="props">
            {{props.row.endtime | dateFmt}}
        </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" min-width="180" align="center">
        <template v-slot="props">
            <el-tag type="success" v-if="props.row.status===1">已启用</el-tag>
            <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180" align="center">
        <template v-slot="props">
            <el-button circle="" icon="el-icon-edit" type="success" size="mini" @click="edit(props.row)"></el-button>
            <el-button circle="" icon="el-icon-delete" type="danger" size="mini" @click="del(props.row.id)"></el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import vm from '../../utils/vm'
export default {
    props:['seckillList'],
    data(){
        return{

        }
    },
    methods:{
        edit(row){
            // console.log(row);
            vm.$emit('sendDataSeckill',row)
        },
        del(id){
            this.$myConfirm(()=>{
                this.$http.post('/seckdelete',{id}).then(res=>{
                    if(res.code===200){
                        this.$success(res.msg)
                        // /更新列表
                        this.$emit('updateList')
                    }else{
                        this.$error(res.msg)
                    }
                })
            })
        }
    }
};
</script>

<style>
</style>