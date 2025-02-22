import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css"; // Import the CSS module
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const logoutfun = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Successful");
  };

  // Function to determine the active item based on the current path
  const getActiveItem = () => {
    if (location.pathname === "/DashboardLayout") return 'dashboard';
    if (location.pathname === "/DashboardLayout/Task") return 'tasks';
    if (location.pathname === "/DashboardLayout/Profile") return 'profile';
    return null; // Default to no active item if none match
  };

  const activeItem = getActiveItem();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <Link
          to="/DashboardLayout"
          className={`${styles.sidebarItem} ${activeItem === 'dashboard' ? styles.active : ''}`}
          id="dashboard-link"
        >
          <i className="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/DashboardLayout/Task"
          className={`${styles.sidebarItem} ${activeItem === 'tasks' ? styles.active : ''}`}
          id="tasks-link"
        >
          <i className="fa-solid fa-list-check"></i>
          <span>Projects</span>
        </Link>
        <Link
          to="/DashboardLayout/Profile"
          className={`${styles.sidebarItem} ${activeItem === 'profile' ? styles.active : ''}`}
          id="profile-link"
        >
          <i className="fa-solid fa-user"></i>
          <span>Profile</span>
        </Link>
      </div>
      <div className={styles.sidebarFooter}>
        <a
          href="#"
          className={styles.sidebarItem}
          id="logout-link"
          onClick={logoutfun}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;