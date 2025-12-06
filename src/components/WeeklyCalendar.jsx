import React, { useMemo } from "react";

export default function WeeklyCalendar({ appointments }) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8am–6pm

  const bySlot = useMemo(() => {
    const map = {};

    appointments.forEach((a) => {
      if (!a.datetime) return;

      const dt = new Date(a.datetime);
      const key = `${dt.getDay()}-${dt.getHours()}`;
      map[key] = a;
    });

    return map;
  }, [appointments]);

  return (
    <div className="overflow-hidden rounded-xl border bg-white dark:bg-gray-800 shadow">
      
      {/* Calendar Header */}
      <div className="grid grid-cols-8 border-b dark:border-gray-700">
        <div className="p-3 text-sm text-gray-400">Time</div>
        {days.map((d) => (
          <div key={d} className="p-3 text-center font-semibold">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      {hours.map((hour) => (
        <div
          key={hour}
          className="grid grid-cols-8 border-t dark:border-gray-700"
        >
          <div className="p-2 text-xs text-gray-400">
            {hour}:00
          </div>

          {[0,1,2,3,4,5,6].map((day) => {
            const slot = bySlot[`${day}-${hour}`];

            return (
              <div
                key={day}
                className="relative h-20 p-1 border-l dark:border-gray-700"
              >
                {slot && (
                  <div className="
                    absolute inset-1
                    bg-gradient-to-br from-[#2EA3DD] to-[#0f5e93]
                    text-white p-2 rounded-lg
                    text-xs shadow
                    cursor-pointer
                    hover:scale-[1.02]
                    transition
                  ">
                    <p className="font-bold truncate">
                      {slot.name}
                    </p>

                    <p className="opacity-90">
                      {new Date(slot.datetime).toLocaleTimeString()}
                    </p>

                    <p className="truncate opacity-80">
                      {slot.location}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
