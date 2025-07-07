import { XBarRChart } from "@/components/Charts/XBarRChart";

import styles from "./style.module.scss";

// const mockMeasurements = [
//   [10.1, 10.2, 10.3, 10.1, 10.2],
//   [10.0, 10.1, 10.2, 10.0, 10.1],
//   [10.3, 10.2, 10.2, 10.4, 10.3],
//   [10.2, 10.2, 10.1, 10.3, 10.3],
// ];

const mockData = {
  Диаметр: [
    [10.1, 10.2, 10.3, 10.1, 10.2],
    [10.0, 10.1, 10.2, 10.0, 10.1],
    [10.3, 10.2, 10.2, 10.4, 10.3],
  ],
  Длина: [
    [15.2, 15.3, 15.1, 15.2, 15.3],
    [15.0, 15.1, 15.2, 15.0, 15.1],
    [15.4, 15.3, 15.2, 15.4, 15.3],
  ],
  Паз: [
    [5.1, 5.0, 5.2, 5.1, 5.0],
    [5.0, 5.1, 5.1, 5.0, 5.1],
    [5.2, 5.2, 5.3, 5.2, 5.1],
  ],
};

export default function ChartsPage() {
  return (
    <section className={styles.charts__page}>
      <XBarRChart data={mockData} />
    </section>
  );
}
