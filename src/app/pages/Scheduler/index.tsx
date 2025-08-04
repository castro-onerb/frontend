import { dayjs } from '@/shared/config/dayjs.config';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Template } from '@/shared/layout/template/template';
import { useNavbar } from '@/shared/components/Navbar/hooks/useNavbar';
import { Navbar } from '@/shared/components/Navbar/Navbar';
import { FetchMonthlyOverviewScheduler } from '@/shared/services/scheduler/fetch-monthly-overview-scheduler';
import { FetchSchedulerByDay } from '@/shared/services/scheduler/fetch-scheduler-by-day';
import type { FetchSchedulerByDayResponse } from '@/shared/services/scheduler/fetch-scheduler-by-day/types/fetch-scheduler-by-day';
import { modalityMap } from '@/shared/services/scheduler/constants/modality';
import { priorityMap } from '@/shared/services/scheduler/constants/priority';
import { Scheduler as SchedulerCom } from '@/shared/components/SchedulerNew/Scheduler';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { Badge } from '@/shared/components/Badge/Badge';
import clsx from 'clsx';
import { formatHourRange } from '@/shared/utils/dates.util';
import { Loading } from '@/shared/components/Loading/Loading';
import { Dropdown } from '@/shared/components/Dropdown/Dropdown';
import { Button } from '@/shared/components/Button/Button';
import { MonthYearSelector } from './MonthYearSelector';
import { getStoredSchedulerDate, saveSchedulerDate } from './helper/scheduler-date.storage';
import { Icon } from '@/shared/components/Icon/Icon';

interface FictionalEvent {
  __isFictional: true;
}

type EventUnion = FetchSchedulerByDayResponse | (Partial<FetchSchedulerByDayResponse> & FictionalEvent);

export default function Scheduler() {

  const [expandedDates, setExpandedDates] = useState<string[]>([]);
	const path = window.location.pathname;
	const { setActions } = useNavbar('navbar');
	const { setActions: setActionsScheduler } = useNavbar('scheduler-action');

	const [selectedMonth, setSelectedMonth] = useState(() => {
		const stored = getStoredSchedulerDate();
		return stored ? stored.month : dayjs().month();
	});

	const [selectedYear, setSelectedYear] = useState(() => {
		const stored = getStoredSchedulerDate();
		return stored ? stored.year : dayjs().year();
	});

	

	const handleSelectDate = (month: number, year: number) => {
		setSelectedMonth(month);
		setSelectedYear(year);
		saveSchedulerDate(month, year);
	};

	useEffect(() => {
		setActions([
			<Navbar.Link to='/' variant='text' color='slate'>Agenda</Navbar.Link>,
			<Navbar.Link to='/exames' variant='text' color='slate'>Exames</Navbar.Link>,
		]);
	}, [path, setActions]);

	useEffect(() => {
		setActionsScheduler([
			<MonthYearSelector
				key={`selector-${selectedYear}-${selectedMonth}`}
				selectedMonth={selectedMonth}
				selectedYear={selectedYear}
				onSelect={handleSelectDate}
			/>,
			<Button.Root variant='contained' corner='pill' size='small' color='primary'><Button.Text className='whitespace-nowrap'><Icon name='bell:fill' /> Chamar próximo</Button.Text></Button.Root>,
		]);
	}, [path, setActionsScheduler, selectedMonth, selectedYear]);

  function handleExpandDay(date: string) {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev : [...prev, date]
    );
  }

  const {
		data: overviewData,
		isLoading: isLoadingOverview,
	} = useQuery({
		queryKey: ['monthly-overview-schedulings', selectedYear, selectedMonth],
		queryFn: () =>
			FetchMonthlyOverviewScheduler({
				month: selectedMonth,
				year: selectedYear,
			}),
	});

  const dailyResults = useQueries({
    queries: expandedDates.map((date) => ({
      queryKey: ['daily-schedulings', date],
      queryFn: () => FetchSchedulerByDay(date),
      enabled: !!date,
    })),
  });

  const allDailyEvents: FetchSchedulerByDayResponse[] = dailyResults.flatMap(
  (result) => result.data ?? []
);

  const loadingDates = new Set(
    dailyResults
      .map((result, i) => result.isLoading ? expandedDates[i] : null)
      .filter((date): date is string => date !== null)
  );

  const events: EventUnion[] = [...allDailyEvents];

  if (Array.isArray(overviewData)) {
    let idxCounter = 0;

    overviewData.forEach((item) => {
      const isExpanded = expandedDates.includes(item.date.toString());
      if (isExpanded) { 
        return;
      }

      for (let i = 0; i < item.count; i++) {
        events.push({
					id: `overview-${idxCounter++}`,
					patient_id: '',
					patient_name: item.representative.patient_name,
					start: dayjs(item.representative.start).toDate(),
					end: dayjs(item.representative.end).toDate(),
					active: true,
					paid: false,
					procedure: item.representative.procedure,
					status: item.representative.status,
					birth: item.representative.birth,
					canceled_at: item.representative.canceled_at,
					confirmed_at: item.representative.confirmed_at,
					date_atendance: new Date(),
					exam: '',
					gender: 'Outro',
					medical_report: null,
					modality: item.representative.modality,
					priority: item.representative.priority,
					can_call: item.representative.can_call,
					__isFictional: true,
        });
      }
    });

    expandedDates.forEach((date) => {
			const hasRealEventForDate = allDailyEvents.some(
				(e) => dayjs(e.start).format('YYYY-MM-DD') === date
			);

			if (!hasRealEventForDate) {
				events.push({
					id: `loading-${date}`,
					patient_id: '',
					patient_name: '',
					start: dayjs(date).toDate(),
					end: dayjs(date).toDate(),
					active: false,
					paid: false,
					procedure: '',
					status: '',
					birth: new Date(),
					canceled_at: null,
					confirmed_at: null,
					date_atendance: new Date(),
					exam: '',
					gender: 'Outro',
					medical_report: null,
					modality: modalityMap.in_person,
					priority: priorityMap.normal,
					can_call: false,
				});
			}
		});
  }

	const expandedWithData = new Set(
		allDailyEvents
			.map((e) => dayjs(e.start).format('YYYY-MM-DD'))
			.filter((date) => expandedDates.includes(date))
	);

	const filteredEvents = events.filter(
		(e): e is FetchSchedulerByDayResponse => {
			const date = dayjs(e.start);
			const isFictional = '__isFictional' in e;

			// ✅ só mantém se for do mês/ano atual
			const isSameMonth = date.month() === selectedMonth;
			const isSameYear = date.year() === selectedYear;

			// ✅ exclui fictícios de dias já expandidos
			if (isFictional && expandedWithData.has(date.format('YYYY-MM-DD'))) {
				return false;
			}

			return isSameMonth && isSameYear;
		}
	);

	filteredEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <Template.Root sidebar={<Navbar.Root devices={[{ view: 'mobile', enabled: false }, { view: 'default', context: 'navbar', enabled: true }]}></Navbar.Root>}>
			{isLoadingOverview && <div className='z-10 fixed flex items-center justify-center inset-0 pointer-events-none'><Loading.Main /></div>}
			<SchedulerCom.Root>
				<SchedulerCom.Header>
					<div className="flex gap-4">
						<Tooltip.Root legend='Atendimento urgente' className='cursor-help'>
							<div className="p-[5px] rounded-full bg-red-500"></div>
							<span className='font-semibold text-sm text-slate-700'>Urgente</span>
						</Tooltip.Root>
						<Tooltip.Root legend='Atendimento com prioridade especial' className='cursor-help'>
							<div className="p-[5px] rounded-full bg-purple-500"></div>
							<span className='font-semibold text-sm text-slate-700'>P. especial</span>
						</Tooltip.Root>
						<Tooltip.Root legend='Atendimento com prioridade' className='cursor-help'>
							<div className="p-[5px] rounded-full bg-pink-500"></div>
							<span className='font-semibold text-sm text-slate-700'>Prioridade</span>
						</Tooltip.Root>
						<Tooltip.Root legend='Atendimento normal' className='cursor-help'>
							<div className="p-[5px] rounded-full bg-primary-500"></div>
							<span className='font-semibold text-sm text-slate-700'>Normal</span>
						</Tooltip.Root>
					</div>
				</SchedulerCom.Header>
				<SchedulerCom.Body
					groups={filteredEvents}
					render={(events, date) =>{
						const isLoading = loadingDates.has(date);

						return (
							<SchedulerCom.GroupDay
								events={events}
								isLoading={isLoading}
								onExpand={() => handleExpandDay(date)}
								render={(event, index) => {
									if (isLoading) {
										return (
											<SchedulerCom.Event key={`skeleton-${index}`} className='animate-pulse'>
												<div className='h-3 w-3 rounded-full bg-slate-300'></div>
												<div className='h-3 w-16 rounded bg-slate-300'></div>
												<div className='h-3 w-24 rounded bg-slate-300'></div>
												<div className='h-3 w-32 rounded bg-slate-300'></div>
											</SchedulerCom.Event>
										);
									}

									return (
										<div className="relative">
											<Dropdown.Root
												placement='top-start'
												key={event.id}
												dropdown={<SchedulerCom.EventCard>
													<EventSchedulerDropdown event={event} />
												</SchedulerCom.EventCard>}>
												<SchedulerCom.Event disabled={!event.can_call}>
													<Tooltip.Root legend={event.priority.legend} className='cursor-help gap-1'>
														<div className={clsx('p-[5px] rounded-full', `bg-${event.priority.color}-500`)}></div>
														<span className='text-sm w-32 font-mono text-slate-600 bg-slate-100 p-0.5 rounded-full'>{formatHourRange(event.start, event.end)}</span>
													</Tooltip.Root>
													<Badge.Root variant='outlined' color={event.modality.color} className='w-22 justify-center'>
														{event.modality.title}
													</Badge.Root>
													<p className='flex items-center gap-1'>
														<span className='line-clamp-1'>{event.patient_name}</span>
														<span>-</span>
														<span className='text-slate-600 text-sm font-medium line-clamp-1'>{event.procedure}</span>
													</p>
												</SchedulerCom.Event>
											</Dropdown.Root>
										</div>
									);
								}}
							/>
						);
				}}/>
			</SchedulerCom.Root>
			<Navbar.Logic
				className='fixed left-auto w-fit right-3 bottom-3 p-2 bg-white shadow-2xl rounded-full flex gap-3'
				devices={
					[{ view: 'mobile', enabled: false },
					{ view: 'default', context: 'scheduler-action', enabled: true }]
				}></Navbar.Logic>
    </Template.Root>
  );
}

function EventSchedulerDropdown({ event }: { event: FetchSchedulerByDayResponse }) {
	const birthYears = dayjs(dayjs()).diff(event.birth, 'year');
  return (
    <div className="flex flex-col">
      <div className="p-3 border-b border-slate-200">
				<p className='font-bold text-lg text-gray-700'>{event.patient_name}</p>
				<div className="flex gap-6 text-sm text-gray-500">
					<span>{dayjs(event.birth).format('DD/MM/YYYY')} - {birthYears == 1 ? '1 ano' : `${birthYears} anos`} - {event.gender}</span>
					<span>ID: {event.patient_id}</span>
				</div>
			</div>
			<div className="py-3 flex gap-2">
				<Button.Root corner='pill' size='small' variant='outlined'>
					<Button.Text>Chamar</Button.Text>
				</Button.Root>
				<Button.Root color='red' corner='pill' size='small' variant='outlined'>
					<Button.Text>Faltou</Button.Text>
				</Button.Root>
			</div>
			<div className="p-3 border-t border-slate-200">
				<p className='text-center text-xs text-slate-400 font-medium'>ATENDIMENTO {event.id}</p>
			</div>
    </div>
  );
}
