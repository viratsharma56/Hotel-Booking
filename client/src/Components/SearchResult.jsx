import queryString from "query-string";
import { useEffect } from "react";
import { useState } from "react";
import { searchHotels } from "../service/hotel";
import HotelComponent from "./HotelComponent";
import SearchForm from "./SearchForm";

const SearchResult = () => {
  const [hotels, setHotels] = useState([]);

  // after mounting we need queries

  useEffect(
    () => {
      const { location, bed, date } = queryString.parse(window.location.search);
      // console.table({location, bed, date})
      const getHotels = async () => {
        let response = await searchHotels({ location, bed, date });
        setHotels(response);
      };
      getHotels();
    },
    // eslint-disable-next-line
    [window.location.search]
  );

  return (
    <>
      <br />
      <SearchForm />
      <br />
      <div className="container">
        <div className="row">
          {hotels &&
            hotels.map((hotel) => (
              <HotelComponent key={hotel._id} hotel={hotel} />
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
