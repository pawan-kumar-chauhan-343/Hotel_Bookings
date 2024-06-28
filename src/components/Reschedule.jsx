import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reschedule = ({ dataFromBooking }) => {
  let bookingId=localStorage.getItem("bookingId") // getting bookingid from local storage

  console.log("first",bookingId,"second",dataFromBooking )
  
  if (dataFromBooking){
    var dataFromBooking=dataFromBooking;
  }else{
    var dataFromBooking=bookingId
  }
  const navigate = useNavigate();
  const [item, setItem] = useState({
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({}); // State for errors

  // Fetch booking data
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3004/bookings/${dataFromBooking}`);
      setItem(response.data);
    };
    fetchData();
  }, [dataFromBooking]); // Refetch data when itemId changes


  const change = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    setErrors({}); // Clear errors on change
  };

  const validateDates = () => {
    const newErrors = {};
    if (!item.startDate) {
      newErrors.startDate = "Start Date is required.";
    } else if (new Date(item.startDate) < new Date()) {
      newErrors.startDate = "Start Date must be in the future.";
    }

    if (!item.endDate) {
      newErrors.endDate = "End Date is required.";
    } else if (new Date(item.startDate) >= new Date(item.endDate)) {
      newErrors.endDate = "End Date must be after Start Date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateDates()) return; // Exit if validation fails

    try {
      await axios.put(`http://localhost:3004/bookings/${dataFromBooking}`, item);
      alert("Data update successfully");
      navigate("/bookings");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "60%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.76)", color:"white" }}>
              <form onSubmit={handleSubmit}>
                <div
                  className="navbar-brand"
                  style={{
                    color: "white", 
                    fontFamily:"cursive",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                    paddingTop: "25px",
                    fontSize: "2em",
                  }}
                >
                  Book a Room
                </div>

                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label">Start Date:</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="startDate"
                    onChange={change}
                  />
                  {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">End Date:</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="endDate"
                    onChange={change}
                  />
                  {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
                </div>
                <br />
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e", width: "100%" }}
                  disabled={Object.keys(errors).length > 0} // Disable button if errors exist
                >
                  Reschedule
                </button>

                {/* Using the concept of conditional rendering, display success message, error messages related to axios calls */}
                <div data-testid="Message" className="text-danger"></div>
                <br />
              </form>
            </div>
          </div>
        </div>
        </div>
    </>
  );
};
 
export default Reschedule;     
