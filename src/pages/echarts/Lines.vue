<template>
  <v-charts :options="lineOptions"/>
</template>

<script>
// 导入echarts  新版必须按需导入,否则图表不显示
import "echarts/lib/chart/line"; //折线图需要的绘制工具
import "echarts/lib/chart/bar"; //柱状图需要的绘制工具
// import 'echarts/lib/chart/pie'    //饼状图需要的绘制工具

// 辅助绘制工具
import "echarts/lib/component/title"; // 绘制标题
import "echarts/lib/component/tooltip"; // 绘制鼠标悬浮提示框
import 'echarts/lib/component/toolbox'  // 右上角工具包  局部缩放,下载的工具
// 导入vue-echarts
import VueEcharts from "vue-echarts";

export default {
  components: {
    "v-charts": VueEcharts,
  },
  data() {
    return {
        // 折线图的配置对象
      lineOptions: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        // 标题
        title:{
            text:'折线图'
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
        // 鼠标悬浮的提示
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.echarts{
  width: 100%;
}
</style>