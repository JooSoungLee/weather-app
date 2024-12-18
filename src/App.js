import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';


// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨 상태정보가 들어간다.
// 3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {
  const [weather,     setWeather] = useState(null);
  const [city,        setCity] = useState("");
  const [loading,     setLoading] = useState(true);
  const [apiErrorLog, setApiErrLog] = useState(null);
  const citis = ['paris', 'new york', 'tokyo', 'seoul']
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d5b907a9ce82a8ebbb57a741b18122f9&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiErrLog(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d5b907a9ce82a8ebbb57a741b18122f9&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log("data : ", data);
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiErrLog(error);
    } finally {
      setLoading(false);
    }
  }

  // 랜더후에 바로 실행을 시킨다.
  // copmponentDidUpdate의 역할과 같음
  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  
  return (
      <div className="app-container">
          {loading ? (
              <ClipLoader color='#ffffff' loading={loading} size={150} aria-label="Loading Spinner" />
          ) : !apiErrorLog ? (
              <>
                  <WeatherBox weather={weather} />
                  <WeatherButton citis={citis} setCity={setCity} getCurrentLocation={getCurrentLocation} />
              </>
          ) : (
              <div className="error-message">{apiErrorLog}</div>
          )}
      </div>
  );
}
export default App;
