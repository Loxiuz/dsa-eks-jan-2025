import { Route, Routes } from "react-router-dom";
import PatienceSortVisualizer from "./components/visualizers/PatienceSortVisualizer";
import Homepage from "./components/Homepage";

function createArrayToSort(): number[] {
  return Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/patience_sort_visualizer"
        element={<PatienceSortVisualizer arrayToSort={createArrayToSort()} />}
      />
    </Routes>
  );
}

export default App;
