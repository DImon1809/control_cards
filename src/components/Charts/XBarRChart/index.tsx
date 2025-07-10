import { useEffect, useState } from "react";
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

import { useCheckMobile, useTranslatePoint } from "@/hooks";

import styles from "./style.module.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const A2 = 0.577;
const D3 = 0;
const D4 = 2.114;

type MeasurementData = {
  [key: string]: number[][];
};

type Props = {
  data: MeasurementData;
};

export const XBarRChart = ({ data }: Props) => {
  const [isMobile] = useCheckMobile();
  const { translatePoint } = useTranslatePoint();

  const parameterNames = Object.keys(data);
  const [activeParameter, setActiveParameter] = useState(parameterNames[0]);
  const [fullscreenChart, setFullscreenChart] = useState<"xbar" | "r" | null>(null);

  useEffect(() => {
    if (!parameterNames.includes(activeParameter)) {
      setActiveParameter(parameterNames[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const currentData = data[activeParameter];

  const subgroupMeans =
    currentData?.map(group => {
      const sum = group.reduce((a, b) => a + b, 0);
      return sum / group.length;
    }) || [];

  const subgroupRanges =
    currentData?.map(group => {
      return Math.max(...group) - Math.min(...group);
    }) || [];

  const XBarBar = subgroupMeans?.reduce((a, b) => a + b, 0) / subgroupMeans.length || 0;
  const RBar = subgroupRanges?.reduce((a, b) => a + b, 0) / subgroupRanges.length || 0;

  const xbarUCL = XBarBar + A2 * RBar;
  const xbarLCL = XBarBar - A2 * RBar;
  const rUCL = D4 * RBar;
  const rLCL = D3 * RBar;

  const labels = currentData?.map((_, idx) => `Партия ${idx + 1}`) || [];

  const xbarChartData = {
    labels,
    datasets: [
      {
        label: "Центральная линия",
        data: Array(labels.length).fill(XBarBar),
        borderColor: "green",
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: "Среднее значение (X̄)",
        data: subgroupMeans,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "UCL (X̄)",
        data: Array(currentData?.length).fill(xbarUCL),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: "LCL (X̄)",
        data: Array(currentData?.length).fill(xbarLCL),
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
        data: Array(currentData?.length).fill(rUCL),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: "LCL (R)",
        data: Array(currentData?.length).fill(rLCL),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return (
    <section className={styles.xbar__container}>
      <div className={styles.xbar__title}>
        <h2>X̄-R контрольные карты</h2>
      </div>

      <div className={styles.chipset__wrapper}>
        {parameterNames?.length &&
          parameterNames.map(name => (
            <button key={name} className={styles.chipset} onClick={() => setActiveParameter(name)}>
              {translatePoint(name)}
            </button>
          ))}
      </div>

      <div className={styles.chart__wrapper} onClick={() => setFullscreenChart("xbar")}>
        <h3>Контрольная карта X̄ — {translatePoint(activeParameter)}</h3>
        <Line data={xbarChartData} />
      </div>

      <div className={styles.chart__wrapper} onClick={() => setFullscreenChart("r")}>
        <h3>Контрольная карта R — {translatePoint(activeParameter)}</h3>
        <Line data={rChartData} />
      </div>

      {fullscreenChart && isMobile && (
        <div className={styles.fullscreenOverlay} onClick={() => setFullscreenChart(null)}>
          <div className={styles.fullscreenChart}>
            <h3>
              {fullscreenChart === "xbar" ? "Контрольная карта X̄" : "Контрольная карта R"} —{" "}
              {translatePoint(activeParameter)}
            </h3>
            <Line
              data={fullscreenChart === "xbar" ? xbarChartData : rChartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
