import AlgoliaPlaces from "algolia-places-react";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createHotel } from "../service/hotel";

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
};

const AddHotel = () => {
  const authState = useSelector((state) => state.authReducer);

  const makeHotelData = () => {
    let hotelData = new FormData();
    hotelData.append("title", values.title);
    hotelData.append("description", values.description);
    values.image && hotelData.append("image", values.image);
    hotelData.append("price", values.price);
    hotelData.append("from", values.from);
    hotelData.append("to", values.to);
    hotelData.append("bed", values.bed);
    hotelData.append("location", location);
    return hotelData;
  };

  const initialValues = {
    title: "",
    description: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  };

  const [values, setValues] = useState(initialValues);
  const [imgPre, setImgPre] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hotelData = makeHotelData();
    let response = await createHotel(authState.token, hotelData);
    if (response) {
      console.log(response);
      toast.success("Hotel has been posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleImageChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
    setImgPre(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="btn btn-outline-secondary btn-block m-2 text-left">
            Upload image
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </label>

          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="form-control m-2"
            value={values.title}
            required={true}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="form-control m-2"
            value={values.description}
          />

          <AlgoliaPlaces
            className="form-control"
            placeholder="Location"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) => setLocation(suggestion.value)}
            style={{ height: "50px", marginleft: "6px !important" }}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="form-control m-2"
            value={values.price}
          />

          <Select
            onChange={(value) => setValues({ ...values, bed: value })}
            className="w-100 m-2"
            size="large"
            placeholder="Number of beds"
          >
            <Select.Option key={1}>{1}</Select.Option>
            <Select.Option key={2}>{2}</Select.Option>
            <Select.Option key={3}>{3}</Select.Option>
            <Select.Option key={4}>{4}</Select.Option>
            <Select.Option key={5}>{5}</Select.Option>
            <Select.Option key={6}>{6}</Select.Option>
            <Select.Option key={7}>{7}</Select.Option>
            <Select.Option key={8}>{8}</Select.Option>
            <Select.Option key={9}>{9}</Select.Option>
            <Select.Option key={10}>{10}</Select.Option>
          </Select>
        </div>

        <DatePicker
          className="form-control m-2"
          placeholder="From date"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />

        <DatePicker
          className="form-control m-2"
          placeholder="To date"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />

        <button className="btn btn-outline-primary m-2">Save</button>
      </form>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-2">
            <img src={imgPre} alt="" className="img img-fluid m-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHotel;
