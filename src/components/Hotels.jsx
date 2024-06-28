import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Hotels.css"
const Hotels = ({ sendDataToApp }) => {
  const [ReView, addRevies] = useState()
  const navigate = useNavigate()
  let userId = localStorage.getItem("userId")
  const [Hotels, sethotel] = useState([]);
  const [hotelId, setHotelId] = useState("") //booking hotel
  ////////////////////////////////////////////////////////////////


  const getHotel = async () => {

    try {
      const response = await axios.get('http://localhost:3004/hotels');
      sethotel(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);


  ////////////////////////////////////////////////////////////////
  //Add Review
  if (ReView) {
    localStorage.setItem("reviewHotelId", ReView)
    if (userId) {
      sendDataToApp(ReView)
      ReView && navigate("/addreview");
    } else {
      alert("Login First")
    }
  }

  ////////////////////////////////////////////////////////////////
  //View revies of Hotels
  const [isReview, setIsReview] = useState(false);
  const [select, setSelect]=useState(null)
  const viewReview = (e) => {
    setIsReview(!isReview);
    setSelect(e)
  };

  //For booking hotel saving hotelId in localstorage if user have logined
  if (hotelId) {
    if (userId) {
      localStorage.setItem("hotelId", hotelId)
      navigate("/book")
    }
    else {
      alert("Please Login first")
      navigate("/login")
    }
  }


  return (
    <div className="hotel_main ">
      {
        Hotels.map((hotel) => (
          <div className="hotel1 ">
            <div className={isReview ? " hotel " : "hotel hotel_1"} key={hotel.id}>
              <div className="image">
              
                <img src={hotel.imageUrl[Math.floor(Math.random()*4)]} alt="hotel.hotelName" className="img" />
              </div>


              <div className="content_hotel ">
                <h1 className="hotelName">{hotel.hotelName}</h1>

                <p><b>City</b> : {hotel.city}</p>
                <p><b>Amenities</b> :{hotel.amenities} </p>
                <p><b>Address</b> : {hotel.address}</p>
                <p><b>PhoneNo</b> : {hotel.phoneNo}</p>
              </div>

              <div className="button_group ">
                <Link type="Active" className="btn btn-primary btn_hotel" to={`/hotels/${hotel.id}`}  >Details </Link>

                <button type="Active" className="btn btn-primary btn_hotel" onClick={() => setHotelId(hotel.id)}> Book A Room{" "} </button>
                {/* generate necessary code to redirect to Book page after clicking on Book A Room button */}

                {/* ================================AddReview========================================================================= */}

                <button type="Active" className="btn btn-primary btn_hotel" onClick={() => addRevies(hotel.id)} >Add Review </button>


                {/* ================================viewReview========================================================================= */}
                <button type="Active" className="btn btn-primary btn_hotel" onClick={()=>viewReview(hotel.id)} id="viewReview"> Review
                </button>


              </div>


            </div>
            <div className={isReview ? "review_hotel" : "hide review_hotel"}>
              {hotel.id==select && (
                <div className="reviews"> <h2 className="heading_review">Reviews</h2>
                  <hr style={{ color: "white", marginTop: "5px", marginBottom: "5px" }} />

                  {Object.entries(hotel.review).map(([key, review]) => (
                    <div key={key} className="review-item">
                      <div className="comment_key">{key} </div>
                      <div className="comment_review"> {review} </div>
                      <hr style={{ color: "white", marginTop: "5px", marginBottom: "5px" }} />

                    </div>

                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      }

    </div>
  );
};

export default Hotels;
