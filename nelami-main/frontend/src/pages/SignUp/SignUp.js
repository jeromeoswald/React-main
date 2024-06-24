import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import MetaData from "../../utils/MetaData";
import Loader from "../../Components/Loader/Loader";
import customFetch from "../../utils/api";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNo: "",
    role: "",
    city: "",
    store: "",
  });

  const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    // Add more cities as needed
  ];

  const [cities, setCities] = useState(indianCities);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const result = value.replace(/[^a-zA-Z ]/gi, "");
      setUser({ ...user, name: result });
    } else if (name === "phoneNo") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setUser({ ...user, [name]: value });
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, address, phoneNo, role, city, store } = user;

    if (!name || !email || !password || !confirmPassword || !phoneNo || !role || !city) {
      toast.error("Please Fill All Required Fields");
      return;
    }

    dispatch({ type: "SIGNUP_USER_REQUEST" });

    const res = await customFetch("/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNo,
        password,
        confirmPassword,
        address,
        city,
        role,
        store,
      }),
    });

    const data = await res.json();

    if (res.status === 201) {
      dispatch({ type: "OTP_SENT_SUCCESS" });
      toast.success(data.message);
      navigate(`/user/validate?email=${email}`, { replace: true });
    } else {
      dispatch({ type: "SIGNUP_USER_FAIL", payload: data.message });
      toast.error(data.message);
    }
  };

  return (
    <>
      <MetaData title="Sign Up - Nelami" />
      <section>
        {/* Banner section */}
      </section>

      <section className="sptb">
        <div className="container customerpage">
          <div className="row">
            <div className="col-lg-4 d-block mx-auto">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-md-12">
                  <form method="POST" onSubmit={handleSubmit}>
                    <div className="card mb-xl-0">
                      <div className="card-header">
                        <h3 className="card-title">Register</h3>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label className="form-label text-dark">Name</label>
                          <input type="text" className="form-control" placeholder="Enter Name" name="name" value={user.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Email address</label>
                          <input type="email" className="form-control" placeholder="Enter Email" name="email" value={user.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Password</label>
                          <input type="password" className="form-control" placeholder="Enter Password" name="password" value={user.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Confirm Password</label>
                          <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Phone No.</label>
                          <input type="text" className="form-control" placeholder="Enter Phone Number" minLength={11} maxLength={15} name="phoneNo" value={user.phoneNo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">City</label>
                          <select className="form-control" name="city" value={user.city} onChange={handleChange} required>
                            <option value="">Select City</option>
                            {cities.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group" required>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="role" value="buyer" id="role-buyer" onChange={handleChange} checked={user.role === 'buyer'} />
                            <label className="form-check-label" htmlFor="role-buyer">
                              Buyer
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="role" value="seller" id="role-seller" onChange={handleChange} checked={user.role === 'seller'} />
                            <label className="form-check-label" htmlFor="role-seller">
                              Seller
                            </label>
                          </div>
                        </div>
                        {user.role === "seller" && (
                          <div className="form-group">
                            <label className="form-label text-dark">Address</label>
                            <input type="text" className="form-control" placeholder="Enter Address" name="address" value={user.address} onChange={handleChange} />
                          </div>
                        )}

                        {user.role === "seller" && (
                          <div className="form-group">
                            <label className="form-label text-dark">Store Name</label>
                            <input type="text" className="form-control" placeholder="Store Name" name="store" value={user.store} onChange={handleChange} />
                          </div>
                        )}

                        <div className="form-footer mt-2">
                          <button type="submit" className="btn btn-primary btn-block">
                            Create New Account
                          </button>
                        </div>
                        <div className="text-center mt-3 text-dark">
                          Already have an account? <Link to="/Login">Sign In</Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
