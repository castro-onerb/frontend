import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/auth/context/AuthProvider';
import PublicRoutes from './routes/public.route';
import PrivateRoutes from './routes/private.route';
import { GlobalEventsListener } from './routes/GlobalEventsListener';
import { AuthRedirectListener } from '@/routes/AuthRedirectListener';
import { useAuthStatus } from './auth/hooks/useAuthStatus';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useState } from 'react';

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

  const [queryClient] = useState(() => new QueryClient());

  return (
    <BrowserRouter>
      <GlobalEventsListener />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RoutesSwitcher />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
