import React, { useState } from "react";
//import axios from "axios";

const Login = () => {
  // const navigate = useNavigate();
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setstate] = useState({
    userid: "",
    password: "",
  });
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    userid: "",
    password: "",
  });
  //state variable used to disable the button when any given form values is invalid.
  const [valid, setValid] = useState(false);
  //state variable to capture the success Message once the Login is completed successfully.
  const [Message, setMessage] = useState("");

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
    // set the condition as it's a required field.
    // set the condition as The length of the password should be between 8 and 12 characters
  };
  const handleSubmit = (event) => {
    // 1. This method will be invoked when user clicks on 'Login' button.
    // 2. You should prevent page reload on submit
    // 3.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    // 4. If the axios call is successful, assign the below string to successMessage state:
    //    "user logged in successfully."
    // 5. If the axios call is not successful, assign the error message to "Error while logging in"
  };

  return (
    <>
      <br />
      <div className="row">
        <div>
          <br />
          <div
            className="cards"
            style={{
              backgroundColor: "lavender",
              width: "500px",
              marginLeft: "600px",
              marginBottom: "100px",
            }}
          >
            <div className="card-body">
              <div className="row p-3">
                <div className="col-lg-6 "></div>
                <div style={{ backgroundColor: "#ebe7e7" }}>
                  <form>
                    {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                    <h3
                      style={{
                        textAlign: "center",
                        fontFamily: "revert-layer",
                        color: "brown",
                      }}
                    >
                      Bonstay with us
                    </h3>
                    <div className="mb-2 mt-2">
                      <label className="form-label">UserId:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="userid"
                      />
                      {/* check whether userid error is set,if set display the corresponding error message using conditional rendering */}
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                      />
                      {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
                    </div>
                    {/* bind the disabled attribute to the button to the valid state variable */}
                    <button
                      type="submit"
                      className="btn mb-2 d-block text-white"
                      style={{
                        backgroundColor: "#88685e",
                        paddingRight: "20px",
                        paddingLeft: "15px",
                      }}
                    >
                      Login
                    </button>
                    <br />
                    {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                    <div data-testid="Message" className="text-danger"></div>
                    {/* create a link for Register page */}
                    sign up to create a new account
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
