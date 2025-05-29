import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from '@/auth/context/AuthProvider';
import PublicRoutes from './routes/public.route';
import PrivateRoutes from './routes/private.route';
import { useContext } from 'react';
import { GlobalEventsListener } from './routes/GlobalEventsListener';
import { AuthRedirectListener } from './routes/authRedirectListener';

function RoutesSwitcher() {
  const { isAuthenticated } = useContext(AuthContext);

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
