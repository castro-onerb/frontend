import { Calendar } from "@/components/CalendarScheduling"
import { useLogout } from "@/hooks/auth/logout/useLogout"

export default function Home() {

  const {handleLogout, error, loading} = useLogout()

  return (
    <div>
      <Calendar.Pill type={2}></Calendar.Pill>
      <button className="p-2 bg-blue-500 text-white font-semibold" onClick={() => handleLogout()}>{loading ? 'Saindo...' : 'Sair'}</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}