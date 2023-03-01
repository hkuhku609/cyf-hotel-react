import React, { useState, useEffect } from "react";
import moment from "moment";
import CustomerProfile from "./CustomerProfile";

const SearchResults = ({ results, getOrderedData }) => {
  const [storedId, setStoredId] = useState(null);
  const [profileData, setProfileData] = useState({});
  const getId = ({ id }) => {
    setStoredId(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedId !== null) {
          const res = await fetch(
            `https://cyf-react.glitch.me/customers/${storedId}/`
          );
          const data = await res.json();
          setProfileData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [storedId]);

  const [order, setOrder] = useState("ASC");
  const sorting = col => {
    if (order === "ASC") {
      const sorted = results.sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      getOrderedData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = results.sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      getOrderedData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <div className="widthTooLong">
      <table className="table text-center">
        <thead>
          <tr>
            <th onClick={() => sorting("id")}>id</th>
            <th onClick={() => sorting("title")}>title</th>
            <th onClick={() => sorting("firstName")}>first name</th>
            <th onClick={() => sorting("surname")}>surname</th>
            <th onClick={() => sorting("email")}>email</th>
            <th onClick={() => sorting("roomId")}>room id</th>
            <th onClick={() => sorting("checkInDate")}>check in date</th>
            <th onClick={() => sorting("checkOutDate")}>check out date</th>
            <th>nights</th>
            <th>profile</th>
          </tr>
        </thead>
        <tbody>
          {results.map(data => (
            <Result key={data.id} data={data} getId={getId} />
          ))}
        </tbody>
      </table>
      {storedId && <CustomerProfile profileData={profileData} />}
    </div>
  );
};

const Result = ({
  data: {
    id,
    title,
    firstName,
    surname,
    email,
    roomId,
    checkInDate,
    checkOutDate
  },
  getId
}) => {
  const [isActive, setIsActive] = useState(false);
  const toggleBg = () => {
    setIsActive(current => !current);
  };

  return (
    <tr style={{ backgroundColor: isActive && "yellow" }} onClick={toggleBg}>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{firstName}</td>
      <td>{surname}</td>
      <td>{email}</td>
      <td>{roomId}</td>
      <td>{checkInDate}</td>
      <td>{checkOutDate}</td>
      <td>{moment(checkOutDate).diff(moment(checkInDate), "days")}</td>
      <td>
        <button
          className="btn btn-primary"
          id={id}
          onClick={() => getId({ id })}
        >
          Show profile
        </button>
      </td>
    </tr>
  );
};
export default SearchResults;
