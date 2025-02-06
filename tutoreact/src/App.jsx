import React, { Suspense, lazy } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load the components
const Login = lazy(() => import("./components/public/Login"));
const Layout = lazy(() => import("./components/public/Layout"));
const DashboardLayout = lazy(() => import("./components/private/DashboardLayout"));
const Dashboard = lazy(() => import("./components/private/Dashboard"));
const Profile = lazy(() => import("./components/private/Profile"));
const Task = lazy(() => import("./components/private/Task"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/DashboardLayout" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="Task" element={<Task />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;