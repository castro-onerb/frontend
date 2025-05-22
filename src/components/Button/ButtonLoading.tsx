import { Icon } from "@iconify/react/dist/iconify.js";

export function ButtonLoading() {
  return (
    <>
      <span className='absolute left-0 aspect-square rounded-full translate-x-[-50%] translate-y-[25%] bg-primary-700/50 animate-load-mp z-0'></span>
      <Icon
        icon={`mingcute:loading-3-fill`}
        className="animate-spin"
        style={{ fontSize: 16 }} />
    </>
  );
}