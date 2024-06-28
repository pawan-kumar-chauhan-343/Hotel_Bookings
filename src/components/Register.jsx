import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState(false)
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
    errors: {},
  });



  const change = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim() || formData.name.length < 4) {
      errors.name = 'Name is required and should be atleast 4 char';
      console.log('Name is required')
    }

    if (!formData.address.trim() || formData.address.length < 5) {
      errors.address = 'Address is required and should be atleast 5 char';

    }

    if (!formData.phoneNo) {
      errors.phoneNo = 'Phone number is required and number must be 10 characters long';
    } else if (!(formData.phoneNo.length == 10)) {
      errors.phoneNo = `Phone number must be 10 characters long`;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid Email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password Length must be greater than 8 characters';
    } else {
      const hasUppercase = /[A-Z]/.test(formData.password);
      const hasLowercase = /[a-z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSpecial = /[^a-zA-Z0-9]/.test(formData.password);

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

  }

  // ==============Done Above============================================

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/users');
      setData(response.data);
      console.log(data)
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ==========================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    var found = false
    const errors = validateForm();
    setFormData({ ...formData, errors });

    if (Object.keys(errors).length === 0) {

      console.log("validation is correct")
      try {
        //Checking data exist in database or not
        for (let user of data) {
          if (user.email === formData.email) {
            found = true
            setMessage(true)
            break
          }
        }
        // if data not exist in data base 
        if (!found) {
          async function handle(e) {

            await axios.post(`http://localhost:3004/users`, formData)
              .then((res) => alert('Data updated successfully'))
              .then(() => navigate("/login"))
              .catch((error) => alert(error.message))
          }
          handle()

          // ===============================================
        }else{
          errors.password="User Already have an account"
        }
      }
      catch (err) { 
        alert("Faild to Login ")
       }
    }




  }



  return (
    <>
      <div>
        <div className="container mt-3 text-start p-5" style={{ width: "60%", fontSize: "14px" }} >
          <div className="row p-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form onSubmit={handleSubmit}>
                {message && <h2 style={{ color: "red" }}>Already have Accound <i><NavLink to="/login">Login </NavLink></i> </h2>}
                <div className="mb-2 mt-2">
                  <label className="form-label">Name:</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={change} />
                  {formData.errors.name && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.name} </span>}

                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">Address:</label>
                  <input type="text" className="form-control" name="address" value={formData.address} onChange={change} />
                  {formData.errors.address && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.address} </span>}

                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">PhoneNo:</label>
                  <input type="text" className="form-control" name="phoneNo" value={formData.phoneNo} onChange={change} />
                  {formData.errors.phoneNo && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.phoneNo} </span>}

                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">Email:</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={change} />
                  {formData.errors.email && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.email} </span>}

                </div>
                <div className="mb-2">
                  <label className="form-label">Password:</label>
                  <input type="password" className="form-control" name="password" value={formData.password} onChange={change} />
                  {formData.errors.password && <span className="error-message errmes" style={{ color: "red" }}> {formData.errors.password} </span>}
                </div>
                <button type="submit" className="btn mb-2 d-block text-white" style={{ backgroundColor: "#88685e" }} >
                  Register
                </button>
                <br />
                <div data-testid="mandatory" className="text-danger"></div>
                <div data-testid="successMessage" className="text-danger"></div>
                <NavLink to="/login">Login </NavLink> with your existing account
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
