import "./App.css";
import Filters from "./components/Filters/Filters";
import WeatherGrid from "./components/WeatherGrid/WeatherGrid";

export default function App() {
  return (
    <div className="App">
      <div className="LeftNav">
        <Filters />
      </div>
      <div className="Content">
        <WeatherGrid />
      </div>
    </div>
  );
}
