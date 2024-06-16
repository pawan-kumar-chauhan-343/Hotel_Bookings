import React, { useState } from "react";
import axios from "axios";

const Hotels = () => {
  // const navigate = useNavigate();
  const [Hotels, sethotel] = useState([]);

  //useEffect can be used to fetch all the hotel details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"

  return (
    <>
      {/* display individual hotel details in Cards and apply some inline styling */}
      <h4>hotel Name</h4>
      <div>
        <p>City : </p>
        <p>Amenities : </p>
        <p>Address :</p>
        <p>Contact No :</p>

        <div class="col-md-12  text-right">
          <button
            className="btn btn-success btn-lg float-right"
            type="active"
            style={{
              backgroundColor: "#88685e",
            }}
          >
            Book A Room{" "}
          </button>
          {/* generate necessary code to redirect to Book page after clicking on Book A Room button */}
          <br />
          <br />
          <button
            className="btn btn-success btn-lg float-right"
            type="active"
            style={{ backgroundColor: "#88685e" }}
          >
            Add Review{" "}
          </button>
          {/* generate necessary code to redirect to Add review page after clicking on Add Review button */}
          <br />
          <br />
          <br />
          <button
            className="btn btn-success btn-lg float-right"
            type="active"
            style={{ backgroundColor: "#88685e" }}
          >
            View Review{" "}
          </button>
          {/* generate necessary code to redirect to show review page after clicking on  View Review button */}
        </div>
      </div>
    </>
  );
};

export default Hotels;
