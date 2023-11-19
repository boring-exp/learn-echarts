<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";
import { eventBus, EVENT_RESIZE } from "./utils/event-bus.js";
import * as _ from "lodash";
function resizeBroadcast() {
  console.log("hello world");
  eventBus.emit(EVENT_RESIZE);
}

// 4. ref函数的首次调用，需要在setup根作用域中
const main = ref(null);
// 1.dom 可以用浏览器api取，但是注意时机
// 2.注意id取名的时候，尽量的带随机数
// 3.在echart图标初始化是，dom的clientWidth和clientHight不能为0
//   如果目标dom高度设置为百分比，那么父组件高度必须能计算出来，否则，表格坍塌
onMounted(() => {
  // 挂载事件
  window.addEventListener("resize", _.debounce(resizeBroadcast, 1000));
  console.log(main);
  const myChart = echarts.init(main.value);
  // 绘制图表
  myChart.setOption(
    ({
      title: {
        text: "计算机品牌售卖占比",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "计算机售卖占比",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "MacOS" },
            { value: 735, name: "联想" },
            { value: 580, name: "戴尔" },
            { value: 484, name: "华为" },
            { value: 300, name: "小米" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    })
  );
  eventBus.on(EVENT_RESIZE, () => {
    myChart.resize();
  });
});

onUnmounted(() => {
  window.removeEventListener(resizeBroadcast);
});
</script>

<template>
  <div ref="main" id="main" style="height: 50%; width: 400px"></div>
</template>
