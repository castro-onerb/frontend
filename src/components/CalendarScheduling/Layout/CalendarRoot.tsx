import '@/components/CalendarScheduling/styles/calendar.scss';

import { Calendar, dayjsLocalizer, type View } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { CalendarCard, type MyEvent } from '@/components/CalendarScheduling/Card/CardRoot';
import { useViewport } from '@/utils/ViewportBool';
import { useEffect, useState } from 'react';
import { CalendarDayHeader } from './CalendarDayHeader';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('pt-br');

const timeZone = 'America/Fortaleza';
const localizer = dayjsLocalizer(dayjs);

export function CalendarRoot({ events }: { events: MyEvent[] }) {

  const { viewer } = useViewport(1100);
  const [currentView, setCurrentView] = useState<View>(viewer[0] ? 'day' : 'week');

  useEffect(() => {
    setCurrentView(viewer[0] ? 'day' : 'week');
  }, [viewer]);

  const min = dayjs.tz('2025-01-01 00:00', timeZone).toDate();
  const max = dayjs.tz('2025-01-01 23:59', timeZone).toDate();

  const nowMinus30min = new Date(Date.now() - 30 * 60 * 1000);

  return (
    <Calendar<MyEvent, object>
      localizer={localizer}
      events={events}
      defaultView={currentView}
      view={currentView}
      onView={setCurrentView}
      views={['day', 'week']}
      scrollToTime={nowMinus30min}
      min={min}
      max={max}
      components={{
        event: CalendarCard,
        header: CalendarDayHeader,
      }}
    />
  );
}
