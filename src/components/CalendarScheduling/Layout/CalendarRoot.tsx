import '@/components/Calendar/styles/calendar.scss';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { CalendarCard, type MyEvent } from '@/components/CalendarScheduling/Card/CardRoot';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('pt-br');

const timeZone = 'America/Fortaleza';
const localizer = dayjsLocalizer(dayjs);

export function CalendarRoot({ events }: { events: MyEvent[] }) {

  const min = dayjs.tz('2025-01-01 00:00', timeZone).toDate();
  const max = dayjs.tz('2025-01-01 23:59', timeZone).toDate();

  const nowMinus30min = new Date(Date.now() - 30 * 60 * 1000);

  return (
    <Calendar<MyEvent, object>
      localizer={localizer}
      events={events}
      defaultView='week'
      views={['week']}
      scrollToTime={nowMinus30min}
      min={min}
      max={max}
      components={{
        event: CalendarCard
      }}
    />
  );
}
