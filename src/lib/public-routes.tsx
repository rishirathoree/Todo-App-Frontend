import type { RootState } from "@/stores/stores";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.auth.auth)

  return data ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
