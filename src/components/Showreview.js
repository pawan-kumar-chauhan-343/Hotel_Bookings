import React, { useState } from "react";
//import axios from "axios";
const Showreview = () => {
  const [Hotels, sethotel] = useState([]);

  //useEffect can be used to fetch the review details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"

  return (
    <>
      {/* display all the reviews with selected hotel name in a card and apply some inline styling */}
      <h3>Customer's Reviews</h3>
      <div>
        <p>hotel Name:hotel review</p>
      </div>
    </>
  );
};

export default Showreview;
