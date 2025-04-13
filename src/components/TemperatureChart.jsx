import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatTemperature = (temp) => Math.round(temp);

function TemperatureChart({ forecastData }) {
  
  const data = forecastData.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: item.main.temp,
    icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
  }));

  return (
    <div className="temperature-chart-container">
      <h3>Temperature Over the Next 24 Hours</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4f5b66" />
          <XAxis dataKey="time" stroke="#a0e9ff" />
          <YAxis stroke="#a0e9ff" />
          
          {/* Customizando o Tooltip para mostrar temperaturas sem decimais */}
          <Tooltip 
            content={({ payload }) => {
              if (payload && payload.length) {
                const { temp, time } = payload[0].payload;
                return (
                  <div style={{ backgroundColor: '#16213e', padding: '0.5rem', borderRadius: '10px', color: '#a0e9ff' }}>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Temp:</strong> {formatTemperature(temp)}°C</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area type="monotone" dataKey="temp" stroke="#a0e9ff" fill="#3c4b72" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="temperature-icons">
        {data.map((hour, index) => (
          <div key={index} className="hourly-temp">
            <img src={hour.icon} alt="Weather Icon" />
            <p>{hour.time}</p>
            <p>{formatTemperature(hour.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemperatureChart;
