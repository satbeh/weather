import { useEffect, useState } from "react";
import "./WeatherGrid.css";

const FETCH_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETE_SUCCESS: 2,
  COMPLETE_ERROR: 3,
};

export default function WeatherGrid() {
  const [stations, setStations] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const maxRows = 9;
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.NOT_STARTED);

  const onPrevClick = () => {
    setPageNum((pageNum) => (pageNum <= 0 ? 0 : pageNum - 1));
  };

  const onNextClick = () => {
    setPageNum((pageNum) =>
      pageNum >= totalPages - 1 ? totalPages - 1 : pageNum + 1
    );
  };

  useEffect(() => {
    setFetchStatus(FETCH_STATUS.IN_PROGRESS);
    fetch("https://api.weather.gov/radar/stations")
      .then((res) => res.json())
      .then((res) => {
        setFetchStatus(FETCH_STATUS.COMPLETE_SUCCESS);
        setStations(res.features);
      })
      .catch((error) => {
        setFetchStatus(FETCH_STATUS.COMPLETE_ERROR);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // if stations are null or undefined, set empty currentpagedata
    if (stations == null) {
      setCurrentPageData([]);
    }

    setTotalPages(Math.ceil(stations.length / maxRows));
    setCurrentPageData(stations.slice(pageNum, pageNum + maxRows));
  }, [stations, pageNum]);

  return (
    <div className="WeatherGrid">
      <h2>Weather App</h2>
      <div className="Grid">
        <div className="Header">
          <div className="Cell">Station Name</div>
          <div className="Cell">Station Identifier</div>
          <div className="Cell">GPS Coordinates</div>
          <div className="Cell">Altitude(m)</div>
        </div>

        <div className="Rows">
          {(fetchStatus === FETCH_STATUS.NOT_STARTED ||
            fetchStatus === FETCH_STATUS.IN_PROGRESS) && (
            <div className="Info">Fetching weather stations.</div>
          )}

          {fetchStatus === FETCH_STATUS.COMPLETE_ERROR && (
            <div className="Error">
              Couldn't fetch the weather stations, try again after sometime.
            </div>
          )}

          {fetchStatus === FETCH_STATUS.COMPLETE_SUCCESS &&
            currentPageData.map((station) => {
              return (
                <div className="Row" key={station.properties.id}>
                  <div className="Cell">{station.properties.name}</div>
                  <div className="Cell">{station.properties.id}</div>
                  <div className="Cell">
                    <a
                      href={`http://maps.google.com/?ie=UTF8&hq=&z=11&ll=${station.geometry.coordinates[1]}, 
                            ${station.geometry.coordinates[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{`[${station.geometry.coordinates[0]}, 
                            ${station.geometry.coordinates[1]}]`}</a>
                  </div>
                  <div className="Cell">
                    {station.properties.elevation.value}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="Footer">
          {fetchStatus === FETCH_STATUS.COMPLETE_SUCCESS &&
            currentPageData.length > 0 && (
              <div className="Pagination">
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
            )}
        </div>
      </div>
    </div>
  );
}
