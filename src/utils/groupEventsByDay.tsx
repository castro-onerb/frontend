import dayjs from 'dayjs';

export function groupEventsByDay<T extends { start: Date }>(events: T[]) {
  return events.reduce<Record<string, T[]>>((acc, event) => {
    const key = dayjs(event.start).tz().format('YYYY-MM-DD');
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});
}
