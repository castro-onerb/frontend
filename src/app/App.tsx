import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/shared/auth/context/AuthProvider';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useState } from 'react';
import { useAuthStatus } from '@/shared/auth/hooks/useAuthStatus';
import { AuthRedirectListener } from '@/routes/authRedirectListener';
import PrivateRoutes from '@/routes/private.route';
import PublicRoutes from '@/routes/public.route';
import { GlobalEventsListener } from '@/routes/GlobalEventsListener';
import { NavbarProvider } from '@/shared/components/Navbar/context/NavbarProvider';

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
					<NavbarProvider>
						<RoutesSwitcher />
					</NavbarProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
