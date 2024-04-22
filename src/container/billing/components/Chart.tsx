import { useEffect } from "react";
import * as echarts from "echarts";

const Chart = ({
  text,
  used,
  remaining,
  textPosition = "left",
  height = "300px",
}: {
  text: string;
  used: number;
  height?: string;
  remaining: number;
  textPosition?: "left" | "center" | "right";
}) => {
  useEffect(() => {
    const chartDom = document.getElementById(text)!;

    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: text,
        left: textPosition,
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        bottom: "left",
      },
      color: ["#d87011", "#16a571"],
      series: [
        {
          name: text,
          type: "pie",
          radius: "50%",
          data: [
            { value: used, name: "Used" },
            { value: remaining, name: "Remaining" },
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
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id={text} style={{ width: "100%", height: height }}></div>;
};

export default Chart;
