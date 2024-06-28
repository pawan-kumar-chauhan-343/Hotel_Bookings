import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addreview = ({ dataFromHotel }) => {
  const userName = localStorage.getItem("name");

  var reviewHotelId=localStorage.getItem("reviewHotelId") //getting reviewHotelId from local storage. because after refreshing the page dataFromHotel will auto deleted
  var dataFromHotel=dataFromHotel?dataFromHotel:reviewHotelId

  const navigate = useNavigate();

  const [state, setState] = useState({
    review: "", // Initial value for the review
    errors: {},
  });

  const handleChange = (event) => {
    setState({ ...state, review: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { review } = state;
    const minLength = 10; // Minimum review length

    if (review.length < minLength) {
      setState({ ...state, errors: { review: "Review must be at least 10 characters long." } });
      return; // Prevent submission if review is too short
    }

    try {
      const res = await axios.get(`http://localhost:3004/hotels/${dataFromHotel}`);
      const hotel = res.data;
      const updateReview = { ...hotel.review, [userName]: review };
      const updateHotel = { ...hotel, review: updateReview };

      await axios.put(`http://localhost:3004/hotels/${dataFromHotel}`, updateHotel);
      alert("Successfully updated!");
      navigate(`/hotels`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "80%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6" style={{ marginRight: "10%" }}>
              {/* Content here (optional) */}
            </div>
            <div className="col-lg-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.76)", borderRadius:"50px 0 50px 0"}}>
              <form onSubmit={handleSubmit} style={{ marginRight: "20px", marginLeft: "20px" }}>
                <div
                  className="navbar-brand"
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                    paddingTop: "25px",
                    fontSize: "2em",
                  }}
                >
                  Your Reviews Mean a Lot to Us
                </div>
                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label" style={{ color: "white" }}>
                    Add your Review:
                  </label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="reviews"
                    value={state.review}
                    onChange={handleChange}
                    rows="4"
                    cols="20"
                    maxLength="100"
                  />
                  {state.errors.review && (
                    <span className="error" style={{ color: "red" }}>
                      {state.errors.review}
                    </span>
                  )}
                </div>
                <br />
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                >
                  Add Review
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addreview;
