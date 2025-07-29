import { lazy, Suspense, type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(async () => import('@/pages/Home'));
const Scheduler = lazy(async () => import('@/pages/Scheduler'));
const InvalidateCodes = lazy(async () => import('@/pages/Recover/disable-codes'));
const Page404 = lazy(async () => import('@/pages/Errors/Page404'));

export default function PrivateRoutes(): ReactElement {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/scheduler" index element={<Scheduler />} />
        <Route path="/invalidate-codes" element={<InvalidateCodes />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
}
