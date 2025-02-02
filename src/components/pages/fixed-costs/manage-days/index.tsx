import { RccToggle } from "rcc-react-lib";
import React, { useState } from "react";
export interface MonthDays {
  day: number;
  active: boolean;
}

const ManageDays = () => {
  const [monthDays, setMonthDays] = useState<MonthDays[]>([
    {
      day: 15,
      active: true,
    },
    {
      day: 30,
      active: false,
    },
  ]);

  const handleActive = (day: number) => {
    setMonthDays((_prev) =>
      _prev.map((item) =>
        item.day === day ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <React.Fragment>
      <div className="row card px-2 py-3">
        {monthDays.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-center"
            onClick={() => handleActive(item.day)}
          >
            <span>{item.day}</span>
            <RccToggle checked={item.active} onChange={() => {}} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ManageDays;
