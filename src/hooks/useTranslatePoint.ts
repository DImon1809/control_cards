const points = {
  diameter: "Диаметр",
  len: "Длина",
  distanceGroove: "Расстояние до паза",
  groove: "Длина паза",
  grooveDepth: "Глубина паза",
  distanceCenter: "Расстояние до центра",
  minDiameter: "Диаметр отверстия",
} as const;

type PointKeys = keyof typeof points;
type Points = (typeof points)[PointKeys];

export const useTranslatePoint = () => {
  const translatePoint = (point: string): Points | "Не найдено" =>
    point in points ? points[point as keyof typeof points] : "Не найдено";

  return { translatePoint };
};
