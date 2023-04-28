import React from "react";
import "./SchoolCalendar.css";

const SchoolCalendar = () => {
  return (
    <div>
      <h3 className="calendar">School Calendar</h3>
      <iframe src="https://calendar.google.com/calendar/u/0/embed?showTitle=0&mode=AGENDA&height=600&wkst=1&bgcolor=%23FFFFFF&src=bridgerlandatc@gmail.com&color=%232952A3&ctz=America/Denver"></iframe>
    </div>
  );
};

export default SchoolCalendar;
