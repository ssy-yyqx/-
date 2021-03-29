<template>
    <vCharts :options="pieOptions" />
</template>

<script>
// 导入vue-echarts
import vCharts from "vue-echarts";
// 按需导入echarts的绘制工具
import "echarts/lib/chart/pie"; // 饼状图
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

export default {
  // 注册组件
  components: {
    vCharts,
  },
  data() {
    return {
      pieOptions: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: 40,
          //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          data: [],
        },
        // 标题
        title: {
          text: "饼状图",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            // data: [
            //   { value: 335, name: "直接访问" },
            //   { value: 310, name: "邮件营销" },
            //   { value: 234, name: "联盟广告" },
            //   { value: 135, name: "视频广告" },
            //   { value: 1548, name: "搜索引擎" },
            // ],
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      this.$http.get("/charts").then((res) => {
        if (res.code === 200) {
          // this.$success(res.msg)
          //   更新数据对象pieOptions
          // console.log(res.list);
          const legend = [];
          const series = [];
          res.list.forEach((item) => {
            legend.push(item.month + "月"),
              series.push({ value: item.total, name: item.month + "月" });
          });
          //   更新配置对象
          // this.pieOptions.legend.data=legend;
          // this.pieOptions.series.data=series
          const config = {
            legend: {
              data: legend,
            },
            series: {
              data: series,
            },
          };
        //   Object.assign():合并对象   后边的会把前边的覆盖
          this.pieOptions = Object.assign(this.pieOptions,config)
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>