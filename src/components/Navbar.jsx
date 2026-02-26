import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">LifeOS</h2>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaHome style={{ marginRight: "8px" }} /> Dashboard
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaChartBar style={{ marginRight: "8px" }} /> Analytics
      </NavLink>
    </nav>
  );
};

export default Navbar;
