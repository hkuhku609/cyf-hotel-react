import React, { useState, createContext, useContext } from "react";
export const formErrorContext = createContext("");
import Bookings from "./Bookings";
import "./App.css";
import Heading from "./Heading";
import TouristInfoCards from "./TouristInfoCards";
import Footer from "./Footer";
import Restaurant from "./Restaurant";

const App = () => {
  const [isFormError, setIsFormError] = useState(false);
  return (
    <div className="App">
      <formErrorContext.Provider value={{ isFormError, setIsFormError }}>
        <Heading />
        <TouristInfoCards />
        <Bookings />
        <Restaurant />
        <Footer
          value={[
            "123 Fake Street, London, E1 4UD",
            "hello@fakehotel.com",
            "0123 456789"
          ]}
        />
      </formErrorContext.Provider>
    </div>
  );
};

export default App;
