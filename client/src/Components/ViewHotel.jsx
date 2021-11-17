import moment from "moment";
import { useState, useEffect } from "react";
import { fetchHotel, isBooked } from "../service/hotel";
import { useSelector } from "react-redux";
import { getSessionId } from "../service/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const currencyFormatter = (data) => {
  return data.amount.toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

const ViewHotel = ({ match, history }) => {
  const authState = useSelector((state) => state.authReducer);

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const hotelId = match.params.id;

  const [hotelDetails, setHotelDetails] = useState({});
  const [img, setImg] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  useEffect(
    () => {
      const hotelData = async () => {
        let response = await fetchHotel(hotelId);
        if (response) {
          setHotelDetails(response);
        }
        setImg(`${process.env.REACT_APP_API}/hotels/image/${hotelId}`);
      };
      hotelData();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      const getBookingStatus = async () => {
        let response =
          authState &&
          authState.token &&
          (await isBooked(authState.token, hotelId));
        if (response) {
          setBooked(response);
        }
      };
      getBookingStatus();
    },
    // eslint-disable-next-line
    []
  );

  const { title, description, price, from, to } = hotelDetails;

  const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const diff = Math.round(Math.abs(end - start) / day);
    return diff;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!authState) {
      history.push("/login");
    } else {
      let response = await getSessionId(authState.token, hotelId);
      if (response) {
        // console.log(response);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_SECRET);
        try {
          let result = await stripe.redirectToCheckout({
            sessionId: response.sessionId,
          });
          console.log(result);
        } catch (error) {
          toast.error("Unable to load stripe page");
        }
        await stripe.redirectToCheckout({
          sessionId: response,
        });
      }
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>{title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <br />
            <img src={img} alt={title} className="img img-fluid m-2" />
          </div>
          <div className="col-md-7">
            <br />
            <b>{description}</b>
            <h3 className="alert alert-info mt-3 text-primary">
              {price && currencyFormatter({ amount: price, currency: "inr" })}
            </h3>
            <p className="card-text">
              <span className="float-right">
                Available for {diffDays(from, to)}{" "}
                {diffDays(from, to) <= 1 ? "day" : "days"}
              </span>
            </p>
            <p>
              Available from {moment(new Date(from)).format("MMMM Do YYYY")}
            </p>
            <p>Available till {moment(new Date(to)).format("MMMM Do YYYY")}</p>
            {hotelDetails &&
              hotelDetails.postedBy &&
              hotelDetails.postedBy.name && (
                <i>
                  Posted by <b>{hotelDetails.postedBy.name}</b>
                </i>
              )}
            <br />
            <button
              onClick={handleClick}
              className="btn btn-primary btn-lg btn-block mt-3"
              disabled={loading || booked}
            >
              {authState && authState.token
                ? loading
                  ? "Processing..."
                  : booked
                  ? "Already booked"
                  : "Book Now"
                : "Login to book now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
