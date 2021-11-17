import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGGED_OUT_USER", payload: null });
    localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="nav-link">
          Hotel booking
        </Link>
        {authState !== null && (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <div
              className="nav-link"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </div>
          </>
        )}
        {authState === null && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
