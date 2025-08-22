import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

interface CalendarProps {
  setDate: any;
  date: any;
  selectRange: boolean;
}
const CalendarComponent = (props: CalendarProps) => {
  const { setDate, date, selectRange } = props;
  const activeTrip = useSelector((state: any) => state.trips.activeTrip);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    console.log(
      "useEffect triggered with date:",
      date,
      "and trip:",
      activeTrip
    );

    if (!activeTrip?.timeline || !date) return;

    const selectedDateStr = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedDateStr = selectedDateStr.replace(/^(\w+)\s/, "$1, ");

    const normalize = (str) => str.replace(/\s+/g, " ").trim().toLowerCase();

    const matches = activeTrip.timeline.filter((item: any) =>
      item.time?.includes(formattedDateStr)
    );

    console.log("Selected:", formattedDateStr);
    console.log("Matches: ", matches);
    setFilteredEvents(matches);
  }, [date, activeTrip]);

  return (
    <div className="CalenderBox h-max w-[425px] bg-[#E5E0D1] flex flex-col justify-start pt-4 mt-4 font-['Sora'] rounded-2xl ">
      <div className="flex justify-around items-center mb-6">
        <span className="text-3xl text-[#585858] font-bold">Timeline</span>
        <button className="px-12 py-3 rounded-2xl bg-[#27292C] text-white text-lg cursor-pointer">
          Add event +
        </button>
      </div>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        className="calendar-container self-center"
      >
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={selectRange}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const formatted = date.toISOString().split("T")[0];

              const hasMatch = activeTrip?.timeline?.some((item) => {
                const itemDate = item.time
                  ? new Date(item.time).toISOString().split("T")[0]
                  : null;
                return itemDate === formatted;
              });

              return hasMatch ? (
                <div className="flex justify-center items-center mt-1">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                </div>
              ) : null;
            }
            return null;
          }}
        />
      </motion.div>

      <div className="px-4 py-4 space-y-2">
        {filteredEvents.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl p-3 text-white text-sm shadow-md"
            style={{
              backgroundColor: item.event.toLowerCase().includes("flight")
                ? "#A7C3FF"
                : item.event.toLowerCase().includes("hotel")
                ? "#FECACA"
                : item.event.toLowerCase().includes("taxi")
                ? "#BBF7D0"
                : "#D7E1FE",
            }}
          >
            <div className="flex justify-between items-center text-[#42786dc9]">
              <span className="font-extrabold text-lg">{item.event}</span>
              <span>{item.time?.split(",")[1]?.trim()}</span>
            </div>
            <div className="text-sm mt-1  text-[#42786dc9]">{item.details}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
