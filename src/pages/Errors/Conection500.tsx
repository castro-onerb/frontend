import { Icon } from '@iconify/react/dist/iconify.js';

export default function Conection500() {
  return (
    <div
      className='z-3 w-dvw h-dvh fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30'>
      <div
        className='z-2 flex flex-col gap-5 items-center p-6 bg-white shadow-xl rounded-3xl border-2 border-slate-200 max-w-[520px]'>
        <Icon icon='iconoir:db-error' className='text-slate-600 animate-pulse' style={{ fontSize: 52 }} />
        <div className='flex flex-col gap-3'>
          <p className='text-center text-2xl text-slate-600'>Estamos sem conexão no momento</p>
          <p className='text-center text-lg leading-none'>Parece que não conseguimos nos conectar aos nossos servidores. Tente novamente em instantes ou fale com o suporte se o problema persistir.</p>
        </div>
      </div>
    </div>
  );
}