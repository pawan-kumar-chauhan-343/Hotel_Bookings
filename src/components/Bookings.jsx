import React from "react";
import { useState } from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

const Bookings = () => {
  //const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  //State to capture the error message when the call made to get all the bookings, fails.
  const [errMsg, setErrMessage] = useState("");
  // State to capture the  message when the call made to delete the given booking is successful.
  const [deleteSuccess, setDeleteSuccess] = useState("");
  

  //useEffect can be used to fetch the booking details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"
  //function to delete the service with given id
  const handleAction = (id) => {
    // Delete the booking from the database by placing HTTP delete request to the
    // url - http://localhost:4000/bookings/<plan ID>
    // If the Axios call is successful, generate an alert "The booking for Booking ID :" <id > " is deleted" 
    // If the Axios call fails, generate alert "Something went wrong".
  };
  return (
    <>
      {/* display individual bookings in Cards and apply some inline styling */}

      <h4>booking.id</h4>

      <div>
        <p>Hotel Name : </p>
        <p>Start Date :</p>
        <p>End Date :</p>
        <p>No of Persons :</p>
        <p>No of Rooms :</p>
        <p>Type of Rooms :</p>

        <button className="btn btn-secondary" data-testid="Reschedule-button">
          Reschedule
        </button>
        {/* generate necessary code to call the function to handle reschedule opration of the user */}
        <br />
        <br />

        <button className="btn btn-secondary" data-testid="delete-button">
          Cancel
        </button>
        {/* generate necessary code to call the function to handle delete opration of the user and set the successful delete message */}
      </div>
    </>
  );
};

export default Bookings;
