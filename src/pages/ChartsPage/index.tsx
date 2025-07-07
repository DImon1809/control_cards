import React from "react";

import { Loader } from "@/components/Loader";

const ChartsPageComponent = React.lazy(() => import("./ChartsPage"));

export const ChartsPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ChartsPageComponent />
    </React.Suspense>
  );
};
