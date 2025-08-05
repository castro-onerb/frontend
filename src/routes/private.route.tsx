import { lazy, Suspense, type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

const Scheduler = lazy(async () => import('@/app/pages/Scheduler'));
const InvalidateSession = lazy(async () => import('@/app/pages/Login/invalidate'));
const Recover = lazy(async () => import('@/app/pages/Recover/'));
const RecoverInvalidate = lazy(async () => import('@/app/pages/Recover/disable-codes'));
const Page404 = lazy(async () => import('@/app/pages/Exceptions/404'));

export default function PrivateRoutes(): ReactElement {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" index element={<Scheduler />} />
				<Route path="/recover" element={<Recover />} />
				<Route path="/recover/invalidate" element={<RecoverInvalidate />} />
				<Route path="/auth/sessions/:id/invalidate" element={<InvalidateSession />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
}
