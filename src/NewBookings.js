import React, { useReducer } from "react";

const NewBookings = ({ newBookings }) => {
  const init = {
    title: "",
    firstName: "",
    surname: "",
    email: "", //--topic doesn't request email, so there is null email on table
    roomId: "",
    checkInDate: "",
    checkOutDate: ""
  };
  const logic = (state, action) => {
    switch (action.type) {
      case "handleTextChange":
        return { ...state, [action.field]: action.payload };
      default:
        state;
    }
  };
  const [state, dispatch] = useReducer(logic, init);

  const titles = ["Mr", "Doctor", "Prince", "Dame", "Madam"];

  const handleSubmit = e => {
    e.preventDefault();
    newBookings(state);
  };

  const handleTextChange = e => {
    dispatch({
      type: "handleTextChange",
      field: e.target.name,
      payload: e.target.value
    });
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
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom02" className="form-label">
          Title
        </label>
        <select
          className="form-select form-select-md mb-3"
          aria-label=".form-select-lg example"
          id="validationCustom02"
          required
          name="title"
          onChange={e => handleTextChange(e)}
        >
          <option defaultValue value="">
            Choose...
          </option>
          {titles.map((title, idx) => (
            <option key={idx} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom03" className="form-label">
          Check In Date
        </label>
        <input
          type="date"
          name="checkInDate"
          className="form-control"
          id="validationCustom03"
          min={new Date().toISOString().slice(0, 10)}
          required
          value={state.checkInDate}
          onChange={e => handleTextChange(e)}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom04" className="form-label">
          Check Out Date
        </label>
        <input
          type="date"
          name="checkOutDate"
          className="form-control"
          id="validationCustom04"
          min={
            state.checkInDate
              ? state.checkInDate
              : new Date().toISOString().slice(0, 10)
          }
          required
          value={state.checkOutDate}
          onChange={e => handleTextChange(e)}
        />
      </div>
      <div className="col-md-4">
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
      </div>
      <div className="col-md-4">
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
      </div>

      <div className="col-md-4 new-booking-btn">
        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </div>
    </form>
  );
};

export default NewBookings;
