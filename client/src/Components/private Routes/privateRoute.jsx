const { useSelector } = require("react-redux");
const { Route, Redirect } = require("react-router");

const PrivateRoute = ({ ...props }) => {
  const authState = useSelector((state) => state.authReducer);

  return authState && authState.token ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
