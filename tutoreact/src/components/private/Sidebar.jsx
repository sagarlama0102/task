import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css"; // Import the CSS module
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate()
  const logoutfun = ()=>{
    localStorage.removeItem("token") 
    navigate ("/")
    toast.success("Logout Successfull")
  }
  
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <Link to="/DashboardLayout" className={`${styles.sidebarItem} `} id="dashboard-link">
          <i className="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/DashboardLayout/Task" className={styles.sidebarItem} id="tasks-link">
          <i className="fa-solid fa-list-check"></i>
          <span>Projects</span>
        </Link>
        <Link to="/DashboardLayout/Profile" className={styles.sidebarItem} id="profile-link">
          <i className="fa-solid fa-user"></i>
          <span>Profile</span>
        </Link>
      </div>
      <div className={styles.sidebarFooter}>
        <a href="#" className={styles.sidebarItem} id="logout-link">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span onClick={logoutfun}>Logout</span>

        </a>
      </div>
    </div>
  );
  
};

export default Sidebar;