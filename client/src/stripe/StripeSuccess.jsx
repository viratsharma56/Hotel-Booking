import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { stripeSuccess } from "../service/stripe";

const StripeSuccess = ({ match, history }) => {
  const authState = useSelector((state) => state.authReducer);
  const hotelId = match.params.id;

  useEffect(
    () => {
      const getResponse = async () => {
        let response = await stripeSuccess(authState.token, hotelId);
        if (response.success) {
          history.push("/dashboard");
        } else {
          history.push("/stripe/cancel");
        }
      };
      getResponse();
    },
    // eslint-disable-next-line
    [hotelId]
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeSuccess;
