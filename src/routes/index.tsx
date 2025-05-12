import { lazy, Suspense, type ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Login = lazy(async () => import("@/pages/Login"));

export default function RoutesApp(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} ></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}