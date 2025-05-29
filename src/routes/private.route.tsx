import { lazy, Suspense, type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(async () => import('@/pages/Home'));
const InvalidateCodes = lazy(async () => import('@/pages/Recover/disable-codes'));
const Page404 = lazy(async () => import('@/pages/Errors/Page404'));

export default function PrivateRoutes(): ReactElement {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/invalidate-codes" element={<InvalidateCodes />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
}