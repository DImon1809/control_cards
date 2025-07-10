export const useTransformData = () => {
  const transformDataToRow = (data: { [key: string]: number[][] }): (string | number)[][] => {
    let rows: number[][] = [];

    const names: string[] = Object.keys(data);

    if (!names?.length || !Object.keys(data)) return [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const currentData = data[name].flat();

      if (i === 0) {
        rows = Array(currentData.length)
          .fill([])
          .map((row, key) => [...row, currentData[key]]);
        continue;
      }

      rows = rows.map((row, key) => [...row, currentData[key]]);
    }

    return [names, ...rows];
  };

  return { transformDataToRow };
};
