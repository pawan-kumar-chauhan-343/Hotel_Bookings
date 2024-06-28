import React, { useState, useEffect } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import axios from "axios";
import "./Single_Hotel.css"
const Hotels = () => {
    const navigate=useNavigate()
    const [True, setTrue]=useState(false)
    var { id } = useParams()

    // const id=4
    const [hotel, setHotel] = useState([])
    const getHotel = async () => {
       
            try {
                var response = await axios.get(`http://localhost:3004/hotels/${id}`);
                setHotel(response.data);
            } catch (error) {
                console.error(error);
            }

    };

    useEffect(() => {
        getHotel();
    }, []);

    return (
        <div className="hotel_ss">
            <div className="hotel_s" key={hotel.id}>
                <h1 className="hotel_name_s"> {hotel.hotelName} |<Link className="a_s" to="/hotels"> Back</Link></h1>
                <hr style={{ color: "white", marginTop: "5px", marginBottom: "5px" }} />

                <div className="image_ss">
                    {hotel.imageUrl ?
                        hotel.imageUrl.map((hotl, index) => (
                            <img src={hotl} alt={hotel.hotelName} key={index} className="image_s" />
                        )) : (<h4>Image is Loading..</h4>)
                    }
                </div>
                
                <hr style={{ color: "white", marginTop: "5px", marginBottom: "0px" }} />

                <div className="details_s">
                    <p><b>City</b> : {hotel.city}</p>
                    <p><b>Amenities</b> :{hotel.amenities} </p>
                    <p><b>Address</b> : {hotel.address}</p>
                    <p><b>PhoneNo</b> : {hotel.phoneNo}</p>
                </div>
                {/* ====================================================== */}
                <div className="comment_hotel_s">
                    {hotel.review && (
                        <div className="reviews"> <h2 className="heading_review">Reviews | <Link className="a_s" to="/hotels">Back</Link></h2>

                            <hr style={{ color: "white", marginTop: "5px", marginBottom: "0px" }} />

                            {Object.entries(hotel.review).map(([key, review]) => (
                                <div key={key} className="review-item">
                                    <div className="comment_key">{key} </div>
                                    <div className="comment_review"> {review} </div>
                                    <hr style={{ color: "white", marginTop: "5px", marginBottom: "0px" }} />

                                </div>
                            ))}

                        </div>

                    )}
                </div>
            </div>
        </div>

    );
};

export default Hotels;

