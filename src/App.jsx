import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Routes, Link, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx"
import Home from "./components/Home"
import Hotels from "./components/Hotels"
import Bookings from "./components/Bookings"
import Register from "./components/Register";
import Book from "./components/Book.jsx";
import Reschedule from "./components/Reschedule.jsx"
import Addreview from "./components/Addreview.jsx";
import Single_Hotel from "./components/Single_Hotel.jsx"
import GitHub from "./components/GitHub.jsx";
const App = () => {
  const [dataFromBooking, setDataFromBooking] = useState("")
  const [dataFromHotel, setDataFromHotel] = useState("")
  let userId = localStorage.getItem("userId")
  let name = localStorage.getItem("name")
  let bookingId = localStorage.getItem("bookingId") // getting bookingid from local storage


  function Logout() {
    localStorage.clear();
    alert("Logout")
  }

  useEffect(() => {

  }, [])

  // getting booking id from Booking
  function handleDatafromBooking(data) {
    setDataFromBooking(data)
  }

  //Getting data from hotel
  function handleDataFromHotel(data) {
    setDataFromHotel(data)
  }



  return (

    <>
      <BrowserRouter>
        <div>
          <nav data-testid="nav-bar" className="navbar navbar-expand-lg navbar-light  bg-custom" style={{ display: "flex", justifyContent: "space-between" }}>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" style={{ fontFamily: "cursive" }} to="">
                  BONSTAY
                </Link>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" style={{ fontFamily: "cursive" }} to="/github">
                  About Me
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>


              <li className="nav-item">
                <NavLink className="nav-link" to="/hotels">
                  Hotels
                </NavLink>
              </li>
              <li className="nav-item">
                {
                  userId && (<NavLink className="nav-link" to="/bookings"> Bookings</NavLink>)
                }
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                {
                  userId && (<h2 className="nav-link" style={{ textAlign: "center", textTransform: "uppercase" }}>{name.slice(0, 5)}</h2>)
                }

              </li>

              <li className="nav-item">
                {
                  userId ? (<a href="/login" className="btn btn-primary btn-lg" onClick={Logout}>
                    Logout
                  </a>) : (<NavLink className="nav-link btn btn-primary btn-lg" to="/login">
                    Login
                  </NavLink>)
                }

              </li>
            </ul>

          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h2>Page Not Found 404 Error  <NavLink to="/"> Home </NavLink></h2>} />
            <Route path="/home" element={<Home />} />
            <Route path="/hotels" element={<Hotels sendDataToApp={handleDataFromHotel}/>} />
            <Route path="/hotels/:id" element={<Single_Hotel />} />
            {
              !userId && <Route path="/login" element={<Login />} />
            }

            {
              !userId && <Route path="/register" element={<Register />} />
            }

            

            <Route path="/github" element={<GitHub />} />
            {
              userId && (<Route path="/bookings" element={<Bookings sendDataToApp={handleDatafromBooking} />} />)
            }
            {
              userId && (<Route path="/book" element={<Book />} />)
            }

            {
              dataFromBooking && (<Route path="/reschedule" element={<Reschedule dataFromBooking={dataFromBooking} />} />)
            }

            {
              bookingId && (<Route path="/reschedule" element={<Reschedule dataFromBooking={dataFromBooking} />} />)
            }


            {
              userId && (<Route path="/addreview" element={<Addreview dataFromHotel={dataFromHotel} />} />)
            }

          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
};

export default App;
