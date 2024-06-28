import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [state, setstate] = useState({
    email: "",
    password: "",
    errors: {}
  });

  const change = (e) => {
    const { name, value } = e.target

    setstate({ ...state, [name]: value })

  };

  const validateForm = () => {
    let errors = {};
    if (!state.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      errors.email = 'Invalid email format';
    }

    if (!state.password) {
      errors.password = 'Password is required';
    } else if (state.password.length < 8) {
      errors.password = 'Password Length must be greater than 8 characters';
    } else {
      const hasUppercase = /[A-Z]/.test(state.password);
      const hasLowercase = /[a-z]/.test(state.password);
      const hasNumber = /[0-9]/.test(state.password);
      const hasSpecial = /[^a-zA-Z0-9]/.test(state.password);

      if (!hasUppercase) {
        errors.password = 'Password must contain at least one uppercase letter';
      }
      if (!hasLowercase) {
        errors.password = 'Password must contain at least one lowercase letter';
      }
      if (!hasNumber) {
        errors.password = 'Password must contain at least one number';
      }
      if (!hasSpecial) {
        errors.password = 'Password must contain at least one special character';
      }
    }

    return errors;
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++

  const handleSubmit = async (e) => {
    var datamatch = true
    e.preventDefault()
    const errors = validateForm();
    setstate({ ...state, errors });


    if (Object.keys(errors).length === 0) {
      console.log("validation is correct")
      try {
        const userData = await axios.get(`http://localhost:3004/users`)
        for (var data of userData.data) {
          if (data.email === state.email && data.password === state.password) {
            localStorage.setItem("name", data.name) //user name
            localStorage.setItem("userId", data.id)//user id
            alert("Please Refresh | successfully logged in")
            navigate("/home")
            datamatch = false
            break
          }
        }
        if (datamatch) {
          errors.password="Invalid userId or password"
          navigate('/login')
        }
      }
      catch (err) { console.log(err) }
    }

  }

  return (
    <>
      <br />
      <div className="row">
        <div>
          <br />
          <div
            className="cards" style={{ backgroundColor: "lavender", width: "500px", marginLeft: "600px", marginBottom: "100px", }}>
            <div className="card-body">
              <div className="row p-3">
                <div className="col-lg-6 "></div>


                <div style={{ backgroundColor: "#ebe7e7" }}>
                  <form onSubmit={handleSubmit}>
                    <h3 style={{ textAlign: "center", fontFamily: "revert-layer", color: "brown", }}>Bonstay with us</h3>
                    <div className="mb-2 mt-2">
                      <label className="form-label">Email:</label>
                      <input type="email" className="form-control" onChange={change} name="email" value={state.email} />
                      {state.errors.email && (
                        <span className="error" style={{ color: "red" }}>{state.errors.email}</span>
                      )}

                    </div>
                    <div className="mb-2">
                      <label className="form-label">Password:</label>
                      <input type="password" className="form-control" onChange={change} name="password" value={state.password} />
                      {state.errors.password && (
                        <span className="error" style={{ color: "red" }}>{state.errors.password}</span>
                      )}

                    </div>
                    <button type="submit" style={{ border: "none", margin: "0px", padding: "0px" }} >
                      <a className="btn mb-2 d-block text-white btn-primary" >Login</a>
                    </button>
                    <br />

                    <div data-testid="Message" className="text-danger"></div>
                    <Link to={"/Register"}>SignUp </Link>to create a new account
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
