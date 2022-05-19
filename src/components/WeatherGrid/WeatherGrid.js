import { useEffect, useState } from "react";
import "./WeatherGrid.css";

export default function WeatherGrid() {
  const [stations, setStations] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const maxRows = 9;

  const onPrevClick = () => {
    setPageNum((pageNum) => (pageNum <= 0 ? 0 : pageNum - 1));
  };

  const onNextClick = () => {
    setPageNum((pageNum) =>
      pageNum >= totalPages - 1 ? totalPages - 1 : pageNum + 1
    );
  };

  useEffect(() => {
    fetch("https://api.weather.gov/radar/stations")
      .then((res) => res.json())
      .then((res) => setStations(res.features))
      .catch((error) => console.log);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(stations.length / maxRows));
    setCurrentPageData(stations.slice(pageNum, pageNum + maxRows));
  }, [stations, pageNum]);

  return (
    <div className="WeatherGrid">
      <h2>Weather</h2>
      <div className="Grid">
        <div className="Header Row">
          <div className="Cell">Station Name</div>
          <div className="Cell">Station Identifier</div>
          <div className="Cell">GPS Coordinates</div>
          <div className="Cell">Altitude(m)</div>
        </div>

        {currentPageData.map((station) => {
          return (
            <div className="Row" key={station.properties.id}>
              <div className="Cell">{station.properties.name}</div>
              <div className="Cell">{station.properties.id}</div>
              <div className="Cell">
                <a
                  href={`http://maps.google.com/?ie=UTF8&hq=&z=13&ll=${station.geometry.coordinates[1]}, 
                  ${station.geometry.coordinates[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`[${station.geometry.coordinates[0]}, 
                ${station.geometry.coordinates[1]}]`}</a>
              </div>
              <div className="Cell">{station.properties.elevation.value}</div>
            </div>
          );
        })}
      </div>

      <div className="Pagination Row">
        <div className={pageNum === 0 ? "Disabled" : ""}>
          <button onClick={onPrevClick}>Prev</button>
        </div>
        <div>
          Page {pageNum + 1} of {totalPages}
        </div>
        <div className={pageNum === totalPages - 1 ? "Disabled" : ""}>
          <button onClick={onNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
}
