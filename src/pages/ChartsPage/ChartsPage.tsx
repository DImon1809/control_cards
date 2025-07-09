import { XBarRChart } from "@/components/Charts/XBarRChart";
import { MeasurementTable } from "@/components/MeasurementTable";
import { Plan } from "@/components/Plan";

import styles from "./style.module.scss";

const mockData = {
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

export default function ChartsPage() {
  return (
    <section className={styles.charts__page}>
      <Plan />
      <MeasurementTable data={mockData} />
      <XBarRChart data={mockData} />
    </section>
  );
}
