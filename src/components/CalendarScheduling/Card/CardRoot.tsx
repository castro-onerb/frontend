export type MyEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: {
    paciente: string;
    tipo: string;
  };
};

export const CalendarCard = ({ event }: { event: MyEvent }) => (
  <div className="bg-red-500 h-full">
    <strong>{event.title}</strong>
    <div className="text-sm text-gray-500">
      {event.resource.paciente} - {event.resource.tipo}
    </div>
  </div>
);
