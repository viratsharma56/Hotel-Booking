import { useState } from "react";
import { loginUserApi } from "../service/api";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const initialDetails = {
    email: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] = useState(initialDetails);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let response = await loginUserApi(loginDetails);
    if (response) {
      localStorage.setItem("auth", JSON.stringify(response));
      dispatch({ type: "LOGGED_IN_USER", payload: response });
      history.push("/dashboard");
    }
  };

  const LoginForm = () => {
    return (
      <form className="mt-5" onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={loginDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            value={loginDetails.password}
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  return (
    <>
      <div className={classes.container}>
        <h1>Login</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">{LoginForm()}</div>
        </div>
      </div>
    </>
  );
};

export default Login;
