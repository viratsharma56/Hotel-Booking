import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConnectNav from "../Components/ConnectNav";
import DashNavbar from "../Components/DashNavbar";
import { HomeOutlined } from "@ant-design/icons";
import { createStripeAccount } from "../service/stripe";
import { useEffect, useState } from "react";
import { getSellerHotels } from "../service/hotel";
import HotelComponent from "../Components/HotelComponent";

const DashboardSeller = () => {
  const [hotels, setHotels] = useState([]);
  const authState = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sellerHotels = async () => {
      let hotels = await getSellerHotels(authState.token);
      setHotels(hotels);
    };
    sellerHotels();
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const response = await createStripeAccount(authState.token); // get login link and related data
    setLoading(false);
    if (response) {
      console.log("Stripe connected", response);
      window.location.href = response.setupLink;
    }
  };

  const stripeConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h3>Your hotels</h3>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/new">
              + Add new
            </Link>
          </div>
        </div>
        <div className="row">
          {hotels.map((hotel) => (
            <HotelComponent key={hotel._id} hotel={hotel} owner={true} />
          ))}
        </div>
      </div>
    );
  };

  const stripeNotConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pointer p-5">
              <HomeOutlined className="h1" />
              <h3>Not have stripe Account linked</h3>
              <p>
                Connect with stripe to tranfer money easily to your bank account
              </p>
              <button
                disabled={loading}
                onClick={handleClick}
                className="btn btn-primary mb-1 mt-2"
              >
                {loading ? "Processing" : "Setup Payouts"}
              </button>
              <p className="text-muted">
                <>
                  You will be redirected to the stripe to completed onboarding
                </>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashNavbar />
      </div>
      {authState &&
      authState.user &&
      authState.user.stripeSeller &&
      authState.user.stripeSeller.charges_enabled
        ? stripeConnected()
        : stripeNotConnected()}
      ;
    </>
  );
};

export default DashboardSeller;
