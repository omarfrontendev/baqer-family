import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard() {
  const token = Cookies.get("token");
  return token ? <Navigate to="/" /> : <Outlet />;
}

export function PagesGuard() {
  const token = Cookies.get("token");

  return !token ? <Navigate to="/login" /> : <Outlet />;
}
