import { Link } from "react-router-dom";

const DashNavbar = () => {
  const location = window.location.pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/dashboard"
          className={`nav-link ${location === "/dashboard" ? "active" : ""}`}
        >
          Your bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/dashboard/seller"
          className={`nav-link ${
            location === "/dashboard/seller" ? "active" : ""
          }`}
        >
          Your postings
        </Link>
      </li>
    </ul>
  );
};

export default DashNavbar;
