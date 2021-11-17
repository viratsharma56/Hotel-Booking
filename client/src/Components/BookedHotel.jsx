import { useState } from "react";
import PaymentInfoModal from "./PaymentInfoModal";

const currencyFormatter = (data) => {
  return data.amount.toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

const BookedHotel = ({ hotel, session, orderBy }) => {
  const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const diff = Math.round(Math.abs(end - start) / day);
    return diff;
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mb-3 card">
        <div className="no-gutters row">
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
                  Booked for {diffDays(hotel.from, hotel.to)}{" "}
                  {diffDays(hotel.from, hotel.to) <= 1 ? "day" : "days"}
                </span>
              </p>
              <div className="card-text">
                <span style={{ fontWeight: 600 }}>Beds booked: </span>
                {hotel.bed} {hotel.bed <= 1 ? "bed" : "beds"}
              </div>
              {showModal && (
                <PaymentInfoModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  session={session}
                  orderBy={orderBy}
                />
              )}
              <div className="d-flex justify-content-between h4">
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => setShowModal(!showModal)}
                >
                  View payment details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookedHotel;
