import { lazy, Suspense, type ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected";
import { GuestRoute } from "./guest";
import { AuthRedirectListener } from "./authRedirectListener";

const Login = lazy(async () => import("@/pages/Login"));
const Home = lazy(async () => import("@/pages/Home"));
const Recover = lazy(async () => import("@/pages/Recover"));
const InvalidateCodes = lazy(async () => import("@/pages/Recover/disable-codes"));

export default function RoutesApp(): ReactElement {
  return (
    <BrowserRouter>
      <AuthRedirectListener />
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } ></Route>
          <Route path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } >
          </Route>
          <Route path="/recover" 
            element={
              <GuestRoute>
                <Recover />
              </GuestRoute>
            } >
          </Route>
          <Route path="/invalidate-codes" 
            element={
              <InvalidateCodes />
            } >
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}