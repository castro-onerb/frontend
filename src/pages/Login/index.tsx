import Logo from '@/assets/img/business/logo-horizontal-color.svg'

export default function Login () {
  return (
    <div className="bg-primary-500 h-dvh flex items-center justify-center">
      <div
        className="p-10 py-14 bg-white sm:rounded-2xl sm:shadow-2xl w-full h-dvh sm:h-auto sm:max-h-full sm:max-w-[369px] flex items-center justify-center">
        <div
          className="flex flex-col gap-10 sm:gap-8">
          <div
            className="flex">
              <img src={Logo} className='w-40 h-15' />
            </div>
        </div>
      </div>
    </div>
  )
}