import { useState } from "react";

import { XBarRChart } from "@/components/Charts/XBarRChart";
import { MeasurementTable } from "@/components/MeasurementTable";
import { Plan } from "@/components/Plan";

import styles from "./style.module.scss";

const mockDataScrew = {
  diameter: [
    [64.8, 64.7, 64.9, 64.95, 64.7],
    [64.84, 64.74, 64.96, 64.75, 64.8],
    [64.84, 64.81, 64.91, 64.95, 64.7],
  ],

  len: [
    [38.2, 38.1, 38.15, 38.2, 38.25],
    [38.1, 38.16, 38.22, 38.1, 38.2],
    [38.15, 38.21, 38.23, 38.2, 38.2],
  ],

  distanceGroove: [
    [35.15, 35.21, 35.23, 35.2, 35.2],
    [35.2, 35.1, 35.15, 35.2, 35.25],
    [35.1, 35.16, 35.22, 35.1, 35.2],
  ],

  groove: [
    [8.02, 8.06, 8.02, 8.03, 8.05],
    [8.05, 8.06, 8.02, 8.01, 8.02],
    [8.02, 8.021, 8.023, 8.04, 8.03],
  ],

  grooveDepth: [
    [43.12, 43.21, 43.25, 43.21, 43.25],
    [43.1, 43.186, 43.21, 43.2, 43.2],
    [43.16, 43.21, 43.23, 43.21, 43.1],
  ],
};

const mockDataPin = {
  diameter: [
    [15.99, 15.98, 15.96, 15.97, 15.98],
    [15.97, 15.988, 15.98, 15.972, 15.982],
    [15.982, 15.988, 15.98, 15.97, 15.972],
  ],

  len: [
    [120.3, 120.22, 120.24, 120.26, 120.4],
    [120.21, 120.12, 120.22, 120.25, 120.3],
    [120.12, 120.11, 120.24, 120.32, 120.33],
  ],

  distanceCenter: [
    [30.21, 30.12, 29.95, 29.9, 30.4],
    [30.27, 30.05, 30.25, 30.1, 30.12],
    [29.91, 30.12, 30.2, 30.4, 29.9],
  ],

  minDiameter: [
    [5.96, 5.97, 5.96, 5.97, 5.98],
    [5.98, 5.988, 5.98, 5.972, 5.982],
    [5.962, 5.98, 5.98, 5.96, 5.982],
  ],
};

export default function ChartsPage() {
  const [planName, setPlanName] = useState<"screw" | "pin">("screw");

  return (
    <section className={styles.charts__page}>
      <Plan planName={planName} setPlanName={setPlanName} />
      <MeasurementTable data={planName === "screw" ? mockDataScrew : mockDataPin} />
      <XBarRChart data={planName === "screw" ? mockDataScrew : mockDataPin} />
    </section>
  );
}
