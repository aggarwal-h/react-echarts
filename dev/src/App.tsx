import { useRef, useState } from "react";
import useReactECharts from "../../src/hooks";
import * as echarts from "echarts";

const generateData = () => {
  let base = +new Date(1988, 9, 3);
  const oneDay = 24 * 3600 * 1000;
  const data = [[base, Math.random() * 300]];
  for (let i = 1; i < 20000; i++) {
    const now = new Date((base += oneDay));
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
  }
  return data;
};

const getOption = () => ({
  tooltip: {
    trigger: "axis",
    position: function (pt: Array<number | string>) {
      return [pt[0], "10%"];
    },
  },
  title: {
    left: "center",
    text: "Large Area Chart",
  },
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
    type: "time",
    boundaryGap: [0, "2"],
  },

  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 20,
    },
    {
      start: 0,
      end: 20,
    },
  ],
  series: [
    {
      name: "Fake Data",
      type: "line",
      smooth: true,
      symbol: "none",
      areaStyle: {},
      data: generateData(),
    },
  ],
});

function App() {
  const [option, setOption] = useState(getOption());
  const chartRef = useRef(null);
  useReactECharts({ echarts: echarts, option: option, ref: chartRef });
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Chart Test</h1>
      <div ref={chartRef} style={{ height: "500px", width: "100%" }} />
      <div
        style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        <button onClick={() => setOption(getOption)}>Refresh</button>
      </div>
    </>
  );
}

export default App;
