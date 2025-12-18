import React, { Suspense, lazy, } from "react";
import { Route, Routes } from "react-router";
import Signup04 from "./pages/signup/signup";
const EmptyAvatar = lazy(() => import("./pages/empty/page-empty"));
const Catalouge = lazy(() => import("./pages/catalogue/catalogue-page"));
const PrivateRoutes = lazy(() => import("./lib/private-routes"));
const PublicRoutes = lazy(() => import("./lib/public-routes"));
const Login04 = lazy(() => import("./pages/login/login-page"));
const Suspense01 = lazy(() => import("./components/suspense-ui"));
import { Toaster } from "@/components/ui/sonner"
import UseAcitivty from "./hooks/use-actvity";

const App: React.FC = () => {

  return (
    <Suspense fallback={<Suspense01 />}>
      <UseAcitivty />
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="*" element={<EmptyAvatar />} />
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<Signup04 />} />
          <Route path="/login" element={<Login04 />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Catalouge />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
