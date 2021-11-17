import { useEffect, useState } from "react";
import { getAllHotels } from "../service/hotel";
import HotelComponent from "./HotelComponent";
import SearchForm from "./SearchForm";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const hotels = async () => {
      let allHotels = await getAllHotels();
      setHotels(allHotels);
    };
    hotels();
  }, []);

  return (
    <>
      <div className="container-fluid p-5 bg-secondary text-center">
        <h1>Book hotels from here</h1>
      </div>
      <div className="col">
        <br />
        <SearchForm />
      </div>
      <div className="container-fluid">
        <br />
        {hotels &&
          hotels.map((hotel) => {
            return <HotelComponent key={hotel._id} hotel={hotel} />;
          })}
      </div>
    </>
  );
};

export default Home;
