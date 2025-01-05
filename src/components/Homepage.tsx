import "./Homepage.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <h1>Algoritmevisualisering</h1>
      <Link to="/patience_sort_visualizer">
        <button id="patienceSortButton">Patience Sort Algorithm</button>
      </Link>
    </div>
  );
}
