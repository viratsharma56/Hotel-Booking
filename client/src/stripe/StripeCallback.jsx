import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInLocalStorage } from "../service/api";
import { getAccountStatus } from "../service/stripe";

const StripeCallback = () => {
  const authState = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const accountStatus = async () => {
      let response = await getAccountStatus(authState.token);
      if (response) {
        updateUserInLocalStorage(response, () => {
          dispatch({ type: "LOGGED_IN_USER", payload: response });
          window.location.href = "/dashboard/seller";
        });
      }
    };

    if (authState && authState.token) {
      accountStatus();
    }
    // eslint-disable-next-line
  }, [authState]);

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="h1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
