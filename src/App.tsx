import PatienceSortVisualizer from "./components/visualizers/PatienceSortVisualizer";

function App() {
  return (
    <>
      <h1>Sorteringsalgoritmer</h1>
      <PatienceSortVisualizer arrayToSort={[7, 4, 6, 2, 3, 9, 1]} />
    </>
  );
}

export default App;
