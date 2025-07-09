import { useState } from "react";

import { useTransformData, useTranslatePoint } from "@/hooks";
import { useCheckMobile } from "@/hooks";

import styles from "./styles.module.scss";

type MeasurementData = {
  [key: string]: number[][];
};

type Props = {
  data: MeasurementData;
};

export const MeasurementTable = ({ data }: Props) => {
  const [isMobile] = useCheckMobile();
  const { translatePoint } = useTranslatePoint();
  const { transformDataToRow } = useTransformData();

  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!data) return null;

  const rows = transformDataToRow(data);

  return (
    <>
      <div
        className={`${styles.tableWrapper} ${isFullscreen ? styles.fullscreen : ""}`}
        onClick={() => {
          if (isMobile) setIsFullscreen(prev => !prev);
        }}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              {rows[0].map((name, i) => (
                <td key={i}>{translatePoint(name as string)}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((columns, i) => (
              <tr key={i}>
                {columns.map((col, j) => (
                  <td key={j}>{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
