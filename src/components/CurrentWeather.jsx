import ReactAnimatedWeather from 'react-animated-weather';

const iconMapping = (iconCode) => {
  const mapping = {
    '01d': 'CLEAR_DAY',
    '01n': 'CLEAR_NIGHT',
    '02d': 'PARTLY_CLOUDY_DAY',
    '02n': 'PARTLY_CLOUDY_NIGHT',
    '03d': 'CLOUDY',
    '03n': 'CLOUDY',
    '04d': 'CLOUDY',
    '04n': 'CLOUDY',
    '09d': 'RAIN',
    '09n': 'RAIN',
    '10d': 'RAIN',
    '10n': 'RAIN',
    '11d': 'SLEET',
    '11n': 'SLEET',
    '13d': 'SNOW',
    '13n': 'SNOW',
    '50d': 'FOG',
    '50n': 'FOG'
  };
  return mapping[iconCode] || 'CLOUDY';
};

export default function CurrentWeather({ data }) {
  const icon = iconMapping(data.weather[0].icon);

  return (
    <div className="current-weather">
      <h2>{data.name}, {data.sys.country}</h2>
      <div className="weather-icon">
        <ReactAnimatedWeather
          icon={icon}
          color="#f1c40f"
          size={64}
          animate={true}
        />
      </div>
      <p className="temp">{Math.round(data.main.temp)}°C</p>
      <p className="description">{data.weather[0].description}</p>
      <div className="details">
        <span>Wind speed: {data.wind.speed} m/s</span>
        <span>Humidity: {data.main.humidity}%</span>
      </div>
      
    </div>
  );
}
