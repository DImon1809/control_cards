import React from "react";

import { Loader } from "@/components/Loader";

const AboutProjectComponent = React.lazy(() => import("@/components/paget/ChartsPage/ChartsPage"));

export const AboutProject = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <AboutProjectComponent />
    </React.Suspense>
  );
};
