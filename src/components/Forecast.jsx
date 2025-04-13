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

export default function Forecast({ data }) {
  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="forecast">
      <h3>Next 5 Days:</h3>
      <div className="forecast-grid">
        {dailyForecasts.map((day) => {
          const icon = iconMapping(day.weather[0].icon);
          return (
            <div key={day.dt} className="forecast-card">
              <p className="forecast-date">
                {new Date(day.dt * 1000).toLocaleDateString('en')}
              </p>
              <div className="forecast-icon">
                <ReactAnimatedWeather
                  icon={icon}
                  color="#f1c40f"
                  size={48}
                  animate={true}
                />
              </div>
              <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
              <p className="forecast-desc">{day.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
