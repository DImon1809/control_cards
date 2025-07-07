import React, { useState } from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const A2 = 0.577;
const D3 = 0;
const D4 = 2.114;

type MeasurementData = {
  [parameter: string]: number[][];
};

type Props = {
  data: MeasurementData;
};

export const XBarRChart: React.FC<Props> = ({ data }) => {
  const parameterNames = Object.keys(data);
  const [activeParameter, setActiveParameter] = useState(parameterNames[0]);

  const currentData = data[activeParameter];

  const subgroupMeans = currentData.map(group => {
    const sum = group.reduce((a, b) => a + b, 0);
    return sum / group.length;
  });

  const subgroupRanges = currentData.map(group => {
    return Math.max(...group) - Math.min(...group);
  });

  const XBarBar = subgroupMeans.reduce((a, b) => a + b, 0) / subgroupMeans.length;
  const RBar = subgroupRanges.reduce((a, b) => a + b, 0) / subgroupRanges.length;

  const xbarUCL = XBarBar + A2 * RBar;
  const xbarLCL = XBarBar - A2 * RBar;

  const rUCL = D4 * RBar;
  const rLCL = D3 * RBar;

  const labels = currentData.map((_, idx) => `Партия ${idx + 1}`);

  const xbarChartData = {
    labels,
    datasets: [
      {
        label: "Среднее значение (X̄)",
        data: subgroupMeans,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "UCL (X̄)",
        data: Array(currentData.length).fill(xbarUCL),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: "LCL (X̄)",
        data: Array(currentData.length).fill(xbarLCL),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const rChartData = {
    labels,
    datasets: [
      {
        label: "Размах (R)",
        data: subgroupRanges,
        borderColor: "green",
        fill: false,
      },
      {
        label: "UCL (R)",
        data: Array(currentData.length).fill(rUCL),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: "LCL (R)",
        data: Array(currentData.length).fill(rLCL),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        {parameterNames.map(name => (
          <button
            key={name}
            onClick={() => setActiveParameter(name)}
            className={`px-4 py-2 rounded ${
              name === activeParameter ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Контрольная карта X̄ — {activeParameter}</h2>
      <Line data={xbarChartData} />

      <h2 className="text-xl font-bold mt-8 mb-4">Контрольная карта R — {activeParameter}</h2>
      <Line data={rChartData} />
    </div>
  );
};
