import Layout from "@/layout";
import type { RootState } from "@/stores/stores";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes: React.FC = () => {
  const { pending, data, error } = useSelector((state: RootState) => state.auth.auth)
  let auth = { data };
  return auth.data ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
