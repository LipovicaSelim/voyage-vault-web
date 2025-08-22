import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import CloudyIcon from "../../assets/Cloudy 2 Color Icon.png";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

function WeatherWidget() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);

  const [forecast, setForecast] = useState([]);
  const city = activeTrip.flightDetails.return.arrival.split("-")[0];
  // console.log("City: ", city);
  const apiKey = `6dc8466bfd2e4353ab0222124252106`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json`,
          {
            params: {
              key: apiKey,
              q: city,
              days: 3,
            },
          }
        );

        console.log("daily: ", response.data.forecast.forecastday);
        const daily = response.data.forecast.forecastday.map((day) => ({
          weatherIcon: day.day.condition.icon,
          weatherTem: Math.round(day.day.avgtemp_c),
          weekDay: new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
          }),
        }));

        setForecast(daily);
      } catch (error) {
        console.error("Weather fetching failed: ", error.message);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <div className="w-[95%] rounded-2xl bg-[#81A39B] font-['Sora'] px-4 py-3 self-center mt-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {forecast[0] && (
            <>
              <img
                src={forecast[0].weatherIcon}
                alt="Weather Icon"
                className="mr-4 w-[40px]"
              />
              <span className="font-bold text-[#F3F8FE] text-5xl">
                {forecast[0].weatherTem}°
              </span>
            </>
          )}
        </div>
        <BsThreeDotsVertical fill="white" size={24} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaLocationArrow fill="#FAFAFA" size={24} />
          <span className="font-semibold text-3xl text-[#FAFAFA]">{city}</span>
        </div>
        <span className="font-bold text-xl text-[#D0DBE6]">In 3 days</span>
      </div>
      <div className="flex justify-around mt-4">
        {forecast.map((day, index) => (
          <div className="flex flex-col items-center" key={index}>
            <img src={day.weatherIcon} alt="icon" className="w-[48px]" />
            <span className="font-semibold text-lg text-[#ced1d5]">
              {day.weatherTem}°
            </span>
            <span className="text-white text-lg">{day.weekDay}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherWidget;
