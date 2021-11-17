import { Link, useHistory } from "react-router-dom";
import { deleteHotel } from "../service/hotel";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const currencyFormatter = (data) => {
  return data.amount.toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const diff = Math.round(Math.abs(end - start) / day);
  return diff;
};

const HotelComponent = ({ hotel, owner = false }) => {
  const history = useHistory();

  const [expired, setExpired] = useState(false);

  useEffect(
    () => {
      const checkExpire = () => {
        const end = new Date(hotel.to);
        const now = new Date();
        if (end < now) {
          setExpired(true);
        }
      };
      checkExpire();
    },
    // eslint-disable-next-line
    []
  );

  const authState = useSelector((state) => state.authReducer);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    let response = await deleteHotel(authState.token, hotel._id);
    if (response) {
      console.log(`Deleting hotel with id ${hotel._id}`);
      toast.success("Hotel successfully deleted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={
                hotel.image && hotel.image.contentType
                  ? `${process.env.REACT_APP_API}/hotels/image/${hotel._id}`
                  : "https://via.placeholder.com/900x500.png?text=MERN+Booking"
              }
              alt="Preview hotel"
              className="card-image img img-fluid"
              style={{ width: "500px", height: "350px", padding: "5px" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {hotel.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({ amount: hotel.price, currency: "inr" })}
                </span>
              </h3>
              <p className="alert alert-info">{hotel.location}</p>
              <p>{`${hotel.description.substring(0, 200)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  Availability for {diffDays(hotel.from, hotel.to)}{" "}
                  {diffDays(hotel.from, hotel.end) <= 1 ? "day" : "days"}
                </span>
              </p>
              <div className="card-text">
                <span style={{ fontWeight: 600 }}>Available beds: </span>
                {hotel.bed} {hotel.bed <= 1 ? "bed" : "beds"}
              </div>
              <div className="card-text mt-2">
                <span style={{ fontWeight: 600 }}>Available from: </span>
                {new Date(hotel.from).toUTCString().substring(0, 17)}
              </div>
              <div className="d-flex justify-content-between h4">
                {!owner ? (
                  <>
                    <button
                      className={`btn btn-${
                        expired ? "secondary" : "primary"
                      } mt-2`}
                      onClick={() => history.push(`/hotel/${hotel._id}`)}
                      disabled={expired}
                    >
                      {expired ? "Expired" : "Show more"}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={`/hotel/edit/${hotel._id}`}>
                      <button className="btn btn-warning mt-4">Edit </button>
                    </Link>
                    <button
                      className="btn btn-danger mt-4"
                      onClick={handleDelete}
                    >
                      Delete{" "}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelComponent;
