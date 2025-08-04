export function SchedulerDay() {
  return (
    <div className="flex items-start gap-4 p-1 border-b border-slate-200">
      <div className="flex items-center gap-4">
        <div
          className='hover:bg-slate-100 w-9 aspect-square py-1 rounded-full flex items-center gap-1 justify-center text-lg font-semibold cursor-pointer bg-primary-500 text-white'>
          <span>3</span>
        </div>
        <span className='text-sm'>JUN - TER</span>
      </div>
      <div className="flex-1 flex flex-col gap-2 items-stretch"></div>
    </div>
  );
}