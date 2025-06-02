import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

interface Day {
  date: dayjs.Dayjs;
}

export function SmartCalendar() {
  const [baseDate, setBaseDate] = useState(() => dayjs().startOf('week'));

  const days: Day[] = useMemo(() => {
    const start = dayjs().startOf('month');
    return Array.from({ length: 30 }, (_, i) => ({
      date: start.add(i, 'day'),
    }));
  }, []);


  const visibleDays = useMemo(() => {
    return days.filter((day) =>
      day.date.isSameOrAfter(baseDate, 'day') &&
      day.date.isBefore(baseDate.add(7, 'day'), 'day')
    );
  }, [days, baseDate]);

  function advance(days: number) {
    setBaseDate(prev => prev.add(days, 'day'));
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <h1>Olá mundo</h1>
        <div className="flex gap-2">
          <button onClick={() => advance(-1)}>← 1 dia</button>
          <button onClick={() => advance(-7)}>⇠ 1 semana</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => advance(1)}>1 dia →</button>
          <button onClick={() => advance(7)}>1 semana ⇢</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {visibleDays.map((day) => (
          <div key={day.date.format('YYYY-MM-DD')} className="p-4 border rounded text-center">
            <div className="font-bold">{day.date.format('ddd')}</div>
            <div>{day.date.format('DD/MM')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
