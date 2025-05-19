import { useLogout } from "@/hooks/auth/logout/useLogout"

export default function Home() {

  const {handleLogout, error, loading} = useLogout()

  return (
    <div>
      <h1>Olá mundo</h1>
      <button className="p-2 bg-blue-500 text-white font-semibold" onClick={() => handleLogout()}>{loading ? 'Saindo...' : 'Sair'}</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}