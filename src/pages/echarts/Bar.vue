<template>
  <div id="container" style="height:600px"></div>
</template>

<script>
// 导入echarts
import * as echarts from "echarts";
// console.log(echarts);
export default {
  mounted() {
    // 1-获取容器对应的dom对象
    const dom = document.querySelector("#container");
    // 2-初始化
    const instance = echarts.init(dom);
    // 3-设置配置对象
    instance.setOption(this.barOptions);
  },
  data() {
    return {
      // 柱状图需要的配置对象
      barOptions: {
        //  图表标题
        title: {
          text: "柱状图",
        },
        color:"#c23531",
        // 鼠标悬浮
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 局部缩放,下载的工具
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // x轴
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130], // y轴
            type: "bar", // 控制图标形状     bar:柱状图   line:折线图   pie:饼状图
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      },
    };
  },
};
</script>

<style>

</style>