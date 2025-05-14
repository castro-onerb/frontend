import { lazy, Suspense, type ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected";
import { GuestRoute } from "./guest";

const Login = lazy(async () => import("@/pages/Login"));
const Home = lazy(async () => import("@/pages/Home"));

export default function RoutesApp(): ReactElement {
  return (
    <BrowserRouter>
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}