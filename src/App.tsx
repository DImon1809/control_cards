import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { XBarChart } from "./XBarChart";

const App = () => {
  return (
    <>
      <Navbar />
      <XBarChart />
      <Loader />
    </>
  );
};

export default App;
