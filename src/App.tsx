import PatienceSortVisualizer from "./components/visualizers/PatienceSortVisualizer";

function createArrayToSort(): number[] {
  return Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
}

function App() {
  return (
    <>
      <h1>Sorteringsalgoritmer</h1>
      <PatienceSortVisualizer arrayToSort={createArrayToSort()} />
    </>
  );
}

export default App;
