import React, { useReducer, useContext, useRef } from "react";
import { formErrorContext } from "./App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewBookings = ({ newBookings }) => {
  const initialState = {
    title: "",
    firstName: "",
    surname: "",
    email: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    firstNameError: "",
    surnameError: "",
    emailError: "",
    roomIdError: "",
    titleError: ""
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "handleTextChange":
        return {
          ...state,
          [action.field]: action.payload
        };
      case "checkFirstName":
        return {
          ...state,
          firstNameError: state.firstName.trim()
            ? "OK"
            : "first name must not be empty"
        };
      case "checkLastName":
        return {
          ...state,
          surnameError: state.surname.trim()
            ? "OK"
            : "last name must not be empty"
        };
      case "checkEmail":
        const checkIfOneAtSign = state.email.split("@").length === 2;
        const checkIfLeastOneFullStop =
          checkIfOneAtSign && state.email.split("@")[1].includes(".");
        return {
          ...state,
          emailError: !checkIfOneAtSign
            ? "email must contain exactly 1 @ symbol"
            : !checkIfLeastOneFullStop
            ? "email must at least one . symbol after the @"
            : "OK"
        };
      case "checkRoomId":
        const checkIfNumber = !isNaN(Number(state.roomId));
        const checkIfBetweenZeroToHundred =
          Number(state.roomId) >= 0 && Number(state.roomId) <= 100;
        return {
          ...state,
          roomIdError: !state.roomId.trim()
            ? "Room Id must not be empty"
            : !checkIfNumber
            ? "room ID must be a number"
            : !checkIfBetweenZeroToHundred
            ? "the number must be between 0 and 100"
            : "OK"
        };
      case "checkTitle":
        return {
          ...state,
          titleError: state.title.trim() ? "OK" : "Please choose a title"
        };
      case "reset":
        return initialState;
      default:
        return state;
    }
  };
  const { setIsFormError } = useContext(formErrorContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const titles = ["Mr", "Doctor", "Prince", "Dame", "Madam"];
  const titleRef = useRef(null);
  const handleSubmit = e => {
    e.preventDefault();

    const isFormValid =
      state.firstNameError === "OK" &&
      state.surnameError === "OK" &&
      state.emailError === "OK" &&
      state.roomIdError === "OK" &&
      state.titleError === "OK";

    if (isFormValid) {
      const { checkInDate, checkOutDate, ...rest } = state;
      const formatDate = date => new Date(date).toISOString().slice(0, 10);
      const newBooking = {
        ...rest,
        checkInDate: formatDate(checkInDate),
        checkOutDate: formatDate(checkOutDate)
      };
      newBookings(newBooking);
      dispatch({ type: "reset" });
      titleRef.current.value = "";
    } else {
      setIsFormError(true);
    }
  };

  const handleTextChange = e => {
    dispatch({
      type: "handleTextChange",
      field: e.target.name,
      payload: e.target.value
    });
    switch (e.target.name) {
      case "firstName":
        dispatch({ type: "checkFirstName" });
        break;
      case "surname":
        dispatch({ type: "checkLastName" });
        break;
      case "email":
        dispatch({ type: "checkEmail" });
        break;
      case "roomId":
        dispatch({ type: "checkRoomId" });
        break;
      case "title":
        dispatch({ type: "checkTitle" });
        break;
      default:
        break;
    }
  };

  return (
    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
      <div className="page-header">
        <h4 className="text-left">Create New Bookings</h4>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom01" className="form-label">
          Room ID
        </label>
        <input
          type="text"
          name="roomId"
          className="form-control"
          id="validationCustom01"
          required
          value={state.roomId}
          onChange={e => handleTextChange(e)}
        />
        <div
          id="validationServer01Feedback"
          className={`${state.roomIdError === "OK" ? "" : "in"}valid-feedback`}
        >
          {state.roomIdError}
        </div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom02" className="form-label">
          Title
        </label>
        <select
          className="form-select form-select-md mb-3"
          aria-label=".form-select-lg example"
          name="title"
          id="validationCustom02"
          required
          onChange={e => handleTextChange(e)}
          ref={titleRef}
        >
          <option value="" selected disabled>
            Choose...
          </option>
          {titles.map((title, idx) => (
            <option key={idx} value={title}>
              {title}
            </option>
          ))}
        </select>
        <div
          id="validationServer02Feedback"
          className={`${state.titleError === "OK" ? "" : "in"}valid-feedback`}
        >
          {state.titleError}
        </div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom03" className="form-label">
          Check In Date
        </label>
        <DatePicker
          dateFormat="yyyy-MM-dd"
          name="checkInDate"
          className="form-control"
          id="validationCustom03"
          selected={state.checkInDate}
          onChange={date =>
            handleTextChange({
              target: {
                name: "checkInDate",
                value: date
              }
            })
          }
          selectsStart
          required
          startDate={state.checkInDate}
          minDate={new Date()}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom04" className="form-label">
          Check Out Date
        </label>
        <DatePicker
          dateFormat="yyyy-MM-dd"
          name="checkOutDate"
          className="form-control"
          id="validationCustom04"
          selected={state.checkOutDate}
          onChange={date =>
            handleTextChange({
              target: { name: "checkOutDate", value: date }
            })
          }
          selectsEnd
          required
          endDate={state.checkOutDate}
          minDate={new Date().getTime() + 24 * 60 * 60 * 1000}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom05" className="form-label">
          First name
        </label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          id="validationCustom05"
          required
          value={state.firstName}
          onChange={e => handleTextChange(e)}
        />
        <div
          id="validationServer03Feedback"
          className={`${
            state.firstNameError === "OK" ? "" : "in"
          }valid-feedback`}
        >
          {state.firstNameError}
        </div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom06" className="form-label">
          Surname
        </label>
        <input
          type="text"
          name="surname"
          className="form-control"
          id="validationCustom06"
          required
          value={state.surname}
          onChange={e => handleTextChange(e)}
        />
        <div
          id="validationServer04Feedback"
          className={`${state.surnameError === "OK" ? "" : "in"}valid-feedback`}
        >
          {state.surnameError}
        </div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom07" className="form-label">
          Email
        </label>
        <input
          type="text"
          name="email"
          className="form-control"
          id="validationCustom07"
          required
          value={state.email}
          onChange={e => handleTextChange(e)}
        />
        <div
          id="validationServer05Feedback"
          className={`${state.emailError === "OK" ? "" : "in"}valid-feedback`}
        >
          {state.emailError}
        </div>
      </div>

      <div className="col-md-3 new-booking-btn">
        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </div>
    </form>
  );
};

export default NewBookings;
