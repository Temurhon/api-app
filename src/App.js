import './App.css';
// variable defined
import {useState, useEffect} from 'react'
import Clear from "./assets/clear.jpg"
import Cloudy from "./assets/cloudy.jpg"
import Rain from "./assets/rain.jpg"
import Snow from "./assets/snow.jpg"
import Overcast from "./assets/overcast.jpg"
import Search from "./assets/search.png"
function App() {

      // state variable
      const [place, setPlace] = useState('new york');
      const [placeInfo, setPlaceInfo] = useState({});

  //Display farenheit alongide the data instead of by itself:
  useEffect(() => {
  handleFetch();
  }, [])


  // function to handle fetch
  const handleFetch = () =>{

    const url = `http://api.weatherapi.com/v1/forecast.json?key=36fdd2d2ef90457d967221935221001&q=${place}&days=1&aqi=yes&alerts=no)`;
  fetch(url)
  .then(response => response.json())
  .then((data) => setPlaceInfo({
    // display the infomration we want:
    name: data.location.name,
    country: data.location.country,
      current: data.current.temp_f,
      // want the first element of array
      high: data.forecast.forecastday[0].day.maxtemp_f,
      low: data.forecast.forecastday[0].day.mintemp_f,
    condition: data.current.condition.text
  }));




  };
// debug
  console.log(placeInfo);


  return (
    <div className="app" 

    style={
      placeInfo.condition?.toLowerCase() === "clear" ||
      placeInfo.condition?.toLowerCase() === "sunny"
        ? { backgroundImage: `url(${Clear})` }
        : placeInfo.condition?.includes("cloudy")
        ? { backgroundImage: `url(${Cloudy})` }
        : placeInfo.condition?.toLowerCase().includes("rain")
        ? { backgroundImage: `url(${Rain})` }
        : placeInfo.condition?.toLowerCase().includes("snow")
        ? { backgroundImage: `url(${Snow})` }
        : { backgroundImage: `url(${Overcast})` }
    }


    >


      <div className='search-input'>
      <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={handleFetch} class="search-button"><img src={Search}></img></button>

      </div>

      <div className='weather-container'>

        <div className='top-p'>
      <h1>{placeInfo.current}°F</h1>


      <div className='condition-high-low'>
            <h1>{placeInfo.condition}</h1>
            <h1>{placeInfo.high}°F</h1>
            <h1>{placeInfo.low}°F</h1>
        </div>
        </div>

        <h2>{placeInfo.name},{placeInfo.country}</h2>
  
      </div>

    </div>
  );

}

export default App;
