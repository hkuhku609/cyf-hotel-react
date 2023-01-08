import React, { useState, useEffect } from "react";
import NewBookings from "./NewBookings.js";
import Search from "./Search.js";
import SearchResults from "./SearchResults.js";

const Bookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const search = searchVal => {
    if (!bookings.length) return;
    if (searchVal !== "") {
      const keys = ["firstName", "surname"];
      const filteredData = bookings.filter(booking =>
        keys.some(key => booking[key].toLowerCase().includes(searchVal))
      );
      setFilteredResults(filteredData);
    } else if (searchVal === "") {
      setFilteredResults(bookings);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cyf-react.glitch.me/");
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        setIsError(null);
        setBookings(data);
        setFilteredResults(data);
      } catch (err) {
        setIsError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => fetchData();
  }, []);

  const newBookings = obj => {
    const newItem = stateName => {
      return [...stateName, { ...obj, id: stateName.length + 1 }];
    };
    setBookings(newItem(bookings));
    setFilteredResults(newItem(filteredResults));
  };

  const getOrderedData = data => {
    setFilteredResults(data);
  };

  return (
    <div className="App-content">
      <div className="container">
        <Search search={search} />
        {isError && <div>{isError}</div>}
        {isLoading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden" />
          </div>
        )}
        {!isError && !isLoading && (
          <>
            <SearchResults
              results={filteredResults}
              getOrderedData={getOrderedData}
            />
            <NewBookings newBookings={newBookings} />
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
