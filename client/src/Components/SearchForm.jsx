import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Select } from "antd";
import AlgoliaPlaces from "algolia-places-react";
import { useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
};

const SearchForm = () => {
  const history = useHistory();

  const [location, setLocation] = useState("");
  const [bed, setBed] = useState(1);
  const [date, setDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({location, bed, date});
    history.push(
      `/search-results?location=${location}&date=${date}&bed=${bed}`
    );
  };

  return (
    <div className="d-flex justify-content-between pb-4">
      <div className="w-100">
        <AlgoliaPlaces
          placeholder="Search by location"
          options={config}
          defaultValue={location}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{ height: 50 }}
        />
      </div>
      <DatePicker.RangePicker
        onChange={(value, datestring) => setDate(datestring)}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        className="w-100"
      />
      <Select
        onChange={(value) => setBed(value)}
        className="w-100"
        size="large"
        placeholder="Number of beds"
      >
        <Select.Option key={1}>1</Select.Option>
        <Select.Option key={2}>2</Select.Option>
        <Select.Option key={3}>3</Select.Option>
        <Select.Option key={4}>4</Select.Option>
        <Select.Option key={5}>5</Select.Option>
        <Select.Option key={6}>6</Select.Option>
      </Select>

      <SearchOutlined onClick={handleSubmit} className="btn btn-primary p-3" />
    </div>
  );
};

export default SearchForm;
