import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import PatienceSortVisualizer from "./components/visualizers/PatienceSortVisualizer.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/patience_sort_visualizer"
        element={<PatienceSortVisualizer />}
      />
    </Routes>
  );
}

export default App;
