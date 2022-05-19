const WEATHER_API_ENDPOINT = "https://api.weather.gov";

export async function getStations() {
  return fetch(`${WEATHER_API_ENDPOINT}/radar/stations`);
}
