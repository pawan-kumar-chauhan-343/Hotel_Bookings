import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Book = () => {
  const hotelId = localStorage.getItem("hotelId") //From local storage
  const hotelName = localStorage.getItem("hotelName") //From local storage
  const userId = localStorage.getItem("userId")//From local storage
  // =========================================
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
    hotelName: hotelName,
    hotelId: hotelId,
    userId: userId,
    errors: {},
  });

  // ==========================================================
  const change = (event) => {
    const { name, value } = event.target;
    // console.log(formData)
    setFormData({
      ...formData, [name]: value
    });
  };
  // ==========================================================
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/hotels');
      setData(response.data);
      console.log(data)
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //////////////////////////////////////////////////////////////

  const validateDates = () => {
    const today = new Date();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    const errors = {};

    if (!formData.startDate.trim() || startDate.getTime() < today.getTime()) {
      errors.startDate = "Start date cannot be in the past.";
    }

    if (!formData.endDate.trim() || endDate.getTime() <= startDate.getTime()) {
      errors.endDate = "End date must be after the start date.";
    }

    if (!formData.noOfPersons.trim() || formData.noOfPersons.length < 1) {
      errors.noOfPersons = 'Number of person must be 1';
    }

    if (!formData.noOfRooms.trim() || formData.noOfRooms.length < 1) {
      errors.noOfRooms = 'Number of room must be 1';
    }

    if (!formData.typeOfRoom.trim()) {
      errors.typeOfRoom = 'Should Not Empty';
    }

    return errors;
  };



  //////////////////////////////////////////////////////////////
  // ==========================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    var found = false
    //Checking hotel id exist in hotels databse or not

    const errors = validateDates();
    setFormData({ ...formData, errors });


    if (Object.keys(errors).length === 0) {

      for (let hotel of data) {
        if (hotel.id === hotelId) {
          found = true;
          localStorage.setItem("hotelName", hotel.hotelName);
          break
        }
      }
      // if data not exist in data base 
      if (found) {
        var handle = async () => {
          try {
            await axios.post(`http://localhost:3004/bookings`, formData)
              .then(() => alert('Hotel Booked successfully'))
              .then(() => navigate("/bookings"))
              .catch((error) => alert(error.message))
          } catch (error) {
            alert(error.message);
          }
        }
        handle()
      }
    }





  };
  // ==========================================================
  return (
    <>
      <div>
        <div
          className="container mt-3 text-start "
          style={{ width: "60%", fontSize: "14px", color: "white" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.807)" }}>
              <form onSubmit={handleSubmit}>
                {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                <div className="navbar-brand btn d-block text-white" style={{ paddingTop: "20px", fontWeight: "900", fontSize: "25px" }} > Book a Room  </div>


                <div className="mb-2 mt-2">
                  <label className="form-label">Start Date:</label>
                  <input type="Date" className="form-control" onChange={change} name="startDate" value={formData.startDate} />
                  {formData.errors.startDate && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.startDate} </span>}

                  {/* Check whether the start date error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">End Date:</label>
                  <input type="Date" className="form-control" onChange={change} name="endDate" value={formData.endDate} />
                  {formData.errors.endDate && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.endDate} </span>}

                  {/* Check whether the end date error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">No Of Persons:</label>
                  <input type="number" className="form-control" onChange={change} name="noOfPersons" value={formData.noOfPersons} />
                  {formData.errors.noOfPersons && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.noOfPersons} </span>}

                  {/* Check whether the noOfPersons error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">No Of Rooms:</label>
                  <input type="number" className="form-control" onChange={change} name="noOfRooms" value={formData.noOfRooms} />
                  {formData.errors.noOfRooms && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.noOfRooms} </span>}

                  {/* Check whether the noOfRooms error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <div className="mb-2">
                  <label className="form-label">Type of Rooms:</label>
                  <select name="typeOfRoom" onChange={change} className="form-control" value={formData.typeOfRoom}>
                    <option value="">--select room type--</option>
                    <option value="AC">AC</option>
                    <option value="Non AC">Non AC</option>
                  </select>
                  {formData.errors.typeOfRoom && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.typeOfRoom} </span>}

                  {/* Check whether the typeOfRoom error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                {/* Bind the disabled attribute to the button to the valid state variable */}
                <button type="submit" className="btn mb-2 d-block text-white btn-primary ps-5 pe-5" >
                  Book
                </button>
                {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}

                <div data-testid="mandatory" className="text-danger"></div>
                <div data-testid="Message" className="text-danger"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;


