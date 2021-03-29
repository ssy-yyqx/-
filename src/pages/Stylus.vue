<template>
    <div class="container">
        <div class="box">测试</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
//  stylus中的注释符..ctrl+/
// 定义变量
bgcolor=orange
// 定义函数
mybox()
    color red
    font-weight 700
    font-size 40px 
    text-align center
.container
    border 1px solid #dddddd
    height 300px
    margin 10px 0
    .box
        width 300px
        height 300px
        background bgcolor
        // 调用函数
        mybox()
</style>    