import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/auth/context/AuthProvider';
import PublicRoutes from './routes/public.route';
import PrivateRoutes from './routes/private.route';
import { GlobalEventsListener } from './routes/GlobalEventsListener';
import { AuthRedirectListener } from './routes/authRedirectListener';
import { useAuthStatus } from './auth/hooks/useAuthStatus';

function RoutesSwitcher() {
  const { isAuthenticated } = useAuthStatus();

  if (isAuthenticated === null) {
    return <div>Verificando autenticação...</div>;
  }

  return (
    <>
      <AuthRedirectListener />
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <GlobalEventsListener />
      <AuthProvider>
        <RoutesSwitcher />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
