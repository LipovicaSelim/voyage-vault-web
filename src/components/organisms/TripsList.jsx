import React from "react";
import { useSelector } from "react-redux";

function TripsList() {
  const trips = useSelector((state) => state.trips.list) || [];
  return (
    <div>
      {trips.map((trip) => (
        <div key={trip.id} className="p-4 border rounded shadow">
          <h2 className="text-2xl font-bold">{trip.destination}</h2>
          <p>
            Dates: {trip.startDate} - {trip.endDate}
          </p>
          <p>People: {trip.members.join(", ")}</p>
          <div>Flight: {JSON.stringify(trip.flightDetails)}</div>
          <div>Hotel: {JSON.stringify(trip.hotelDetails)}</div>
          <div>Timeline: {JSON.stringify(trip.timeline)}</div>
          <div>Expenses: {JSON.stringify(trip.expenses)}</div>
        </div>
      ))}
    </div>
  );
}

export default TripsList;
