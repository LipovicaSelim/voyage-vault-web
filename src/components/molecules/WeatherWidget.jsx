import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../../store/weatherSlice";

function WeatherWidget() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);
  const dispatch = useDispatch();

  const city = activeTrip.flightDetails.return.arrival.split("-")[0];
  const forecast = useSelector((state) => state.weather.data[city] || []);
  const status = useSelector((state) => state.weather.status);

  useEffect(() => {
    if (!city || forecast.length > 0) return;
    dispatch(fetchWeather(city));
  }, [city, forecast.length, dispatch]);

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
              <span className="font-bold text-[#F3F8FE] text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl">
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
          <span className="font-semibold ml-2 text-xl xl:text-xl 2xl:text-2xl text-[#FAFAFA]">
            {city}
          </span>
        </div>
        <span className="font-bold text-xl text-[#D0DBE6]">In 3 days</span>
      </div>
      <div className="flex justify-around mt-4">
        {forecast.map((day, index) => (
          <div className="flex flex-col items-center" key={index}>
            <img
              src={day.weatherIcon}
              alt="icon"
              className="xl:w-[40px] 2xl:w-[48px] lg:w-[36px]"
            />
            <span className="font-semibold text-lg text-[#ced1d5]">
              {day.weatherTem}°
            </span>
            <span className="text-white text-lg">{day.weekDay}</span>
          </div>
        ))}
      </div>
      {status === "loading" && <div>Loading weather...</div>}
    </div>
  );
}

export default WeatherWidget;
