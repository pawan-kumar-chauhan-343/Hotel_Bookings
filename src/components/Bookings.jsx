import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./bookings.css"

const Bookings = ({sendDataToApp}) => {
  const navigate=useNavigate()
  const [reschudel, setReschudel]=useState("")
  const [data, setData] = useState("")
  const userId = localStorage.getItem("userId")//From local storage
  const [cancleId, setCancle] = useState()
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/bookings');
      setData(response.data);
      console.log(data)
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ======================================
  let hotelsId = []
  for (let booked_hotel of data) {
    if (booked_hotel.userId === userId) {
      hotelsId.push(booked_hotel)
    }
  }
  //  ==========================================
  //delete Hotel Booking
  if (cancleId) {
        var answer = window.confirm("Do you want to cancel. if yes click 'OK' if not click 'Cancel' ");
        if(answer){
          axios.delete(`http://localhost:3004/bookings/${cancleId}`)
          .then(() => alert('Cancled Please Refresh:'))
          .catch(()=>alert("faild to delete"))
        }else{
          alert("Not cancel")
        }   

  }
//  ======================================================

  if(reschudel){
    sendDataToApp(reschudel)
    localStorage.setItem("bookingId", reschudel) // storing data in local storage
    reschudel?(navigate("/reschedule")):alert("reschedule: Please refresh")
  }
  return (
    <div className="booking_main">
      {!hotelsId[0] ? (<h2 style={{ margin: "30px 0px 0px 20px" }}>You don't have hotel booking Please book hotel <Link to="/hotels">Book Hotel</Link></h2>) : ""}

      {
        hotelsId.map((booking) => (
          <div key={booking.id} className="booking" >
            <h1 className="hotel_name">{booking.hotelName}</h1>


            <div>
              <h4><b>Booking ID :</b> {booking.id}</h4>
              <p><b>Start Date :</b> {booking.startDate}</p>
              <p><b>End Date : </b> {booking.endDate}</p>
              <p><b>No of Persons :</b> {booking.noOfPersons}</p>
              <p><b>No of Rooms :</b> {booking.noOfRooms}</p>
              <p><b>Type of Rooms :</b> {booking.typeOfRoom}</p>

              <button className="btn btn-primary" data-testid="Reschedule-button" onClick={()=>setReschudel(booking.id)}>
                Reschedule
              </button>
              {/* generate necessary code to call the function to handle reschedule opration of the user */}
              <br />
              <br />

              <button className="btn btn-danger" data-testid="delete-button" onClick={() => setCancle(booking.id)}> Cancel </button>
              {/* generate necessary code to call the function to handle delete opration of the user and set the successful delete message */}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Bookings;
