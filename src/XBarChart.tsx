import React from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

// 👉 Пример данных: массив партий, каждая — массив измерений
const measurements = [
  [10.1, 9.9, 10.0, 10.2, 10.1], // Партия 1
  [10.3, 10.2, 10.4, 10.1, 10.2], // Партия 2
  [10.0, 9.8, 9.9, 10.1, 9.9], // Партия 3
  [10.5, 10.3, 10.4, 10.6, 10.2], // Партия 4
];

// 👉 Функция для среднего и размаха
const calculateStats = (data: number[][]) => {
  const xBars = data.map(
    (group) => group.reduce((sum, val) => sum + val, 0) / group.length
  );
  const ranges = data.map((group) => Math.max(...group) - Math.min(...group));
  const xBarBar = xBars.reduce((sum, val) => sum + val, 0) / xBars.length;
  const rBar = ranges.reduce((sum, val) => sum + val, 0) / ranges.length;

  const n = data[0].length; // Размер подгруппы
  const A2_TABLE: Record<number, number> = {
    2: 1.88,
    3: 1.02,
    4: 0.73,
    5: 0.58,
    6: 0.48,
    7: 0.42,
    8: 0.37,
    9: 0.34,
    10: 0.31,
  };

  const A2 = A2_TABLE[n] || 0.58;

  const UCL = xBarBar + A2 * rBar;
  const LCL = xBarBar - A2 * rBar;

  return { xBars, xBarBar, UCL, LCL };
};

const { xBars, xBarBar, UCL, LCL } = calculateStats(measurements);

const labels = xBars.map((_, i) => `Партия ${i + 1}`);

const data = {
  labels,
  datasets: [
    {
      label: "X̄ (Средние)",
      data: xBars,
      borderColor: "blue",
      backgroundColor: "blue",
      tension: 0.2,
    },
    {
      label: "UCL",
      data: xBars.map(() => UCL),
      borderColor: "red",
      borderDash: [5, 5],
      pointRadius: 0,
    },
    {
      label: "LCL",
      data: xBars.map(() => LCL),
      borderColor: "red",
      borderDash: [5, 5],
      pointRadius: 0,
    },
    {
      label: "Средняя линия",
      data: xBars.map(() => xBarBar),
      borderColor: "green",
      borderDash: [2, 2],
      pointRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Размер (мм)",
      },
    },
  },
};

export const XBarChart = () => {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2 className="text-xl font-bold text-center mb-4">
        Контрольная карта X̄
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};
