import { useState } from "react";
import { createUserApi } from "../service/api";
import classes from "./Register.module.css";

const initialDetails = {
  name: "",
  email: "",
  password: "",
};

const Register = ({ history }) => {
  const [registerDetails, setRegisterDetails] = useState(initialDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await createUserApi(registerDetails);
    if (response) {
      setRegisterDetails(initialDetails);
      history.push("/login");
    }
  };

  const handleChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const registerForm = () => {
    return (
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label">Your name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your name"
            value={registerDetails.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={registerDetails.email}
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
            value={registerDetails.password}
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
        <h1>Register</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">{registerForm()}</div>
        </div>
      </div>
    </>
  );
};

export default Register;
