import { useState } from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";
import WeatherGrid from "./components/WeatherGrid/WeatherGrid";

export default function App() {
  const [keyword, setKeyword] = useState("");

  const onSearch = (keyword) => setKeyword(keyword);

  return (
    <div className="App">
      <div className="LeftNav">
        <Filters onSearch={onSearch} />
      </div>
      <div className="Content">
        <WeatherGrid keyword={keyword} />
      </div>
    </div>
  );
}
