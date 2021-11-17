import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BookedHotel from "../Components/BookedHotel";
import ConnectNav from "../Components/ConnectNav";
import DashNavbar from "../Components/DashNavbar";
import { fetchUserHotels } from "../service/hotel";

const Dashboard = () => {
  const authState = useSelector((state) => state.authReducer);

  const [bookings, setBookings] = useState([]);

  useEffect(
    () => {
      const fetchHotels = async () => {
        const response = await fetchUserHotels(authState.token);
        if (response) {
          console.log(response);
          setBookings(response);
        }
      };
      fetchHotels();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashNavbar />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h3>Hotels Available</h3>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        {bookings &&
          bookings.map((booking) => (
            <BookedHotel
              key={booking._id}
              hotel={booking.hotel}
              orderBy={booking.orderBy}
              session={booking.session}
            />
          ))}
      </div>
    </>
  );
};

export default Dashboard;
