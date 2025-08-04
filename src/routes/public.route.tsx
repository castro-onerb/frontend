import { lazy, Suspense, type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(async () => import('@/app/pages/Login'));
const Page404 = lazy(async () => import('@/app/pages/Exceptions/404'));
const Recover = lazy(async () => import('@/app/pages/Recover/'));
const InvalidateCodes = lazy(async () => import('@/app/pages/Recover/disable-codes'));

export default function PublicRoutes(): ReactElement {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/invalidate-codes" element={<InvalidateCodes />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
}
