import { Outlet } from "react-router-dom";
import DashboardLayoutCSS from "./Dashboard.module.css";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className={DashboardLayoutCSS.DashboardLayout}>
      <div className={DashboardLayoutCSS.sidebar}>
        <Sidebar />
      </div>
      <div className={DashboardLayoutCSS.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;