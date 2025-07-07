import { Navbar } from "./components/Navbar";
import { ChartsPage } from "./pages/ChartsPage";
import { XBarChart } from "./XBarChart";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <XBarChart /> */}
      <ChartsPage />
    </>
  );
};

export default App;
