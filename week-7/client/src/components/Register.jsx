// register code here
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [axiosResponse, setAxiosResponse] = useState(null);
  const [userRegister, setUserRegister] = useState(true);
  // call the functions onClick of button.
  async function handleRegister(e) {
    e.preventDefault(); // Prevent page reload on form submission
    const url =
      userRegister == true
        ? "http://localhost:3000/users/signup"
        : "http://localhost:3000/admin/signup";

    console.log(details, userRegister);
    try {
      const resposne = await axios.post(url, details); // if you don't know about axios, give it a read https://axios-http.com/docs/intro
      setAxiosResponse(resposne.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setAxiosResponse(error.response.data.msg);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((data) => ({ ...data, [name]: value }));
  }
  useEffect(() => {
    console.log(
      "User type:",
      userRegister ? "User" : "Admin",
      details,
      axiosResponse
    );
  }, [userRegister, details, axiosResponse]);
  return (
    <div>
      <form onSubmit={handleRegister}>
        <h1> {userRegister == false ? "Admin" : "User"} Registration ..</h1>
        <p>
          <button
            onClick={() => setUserRegister((userRegister) => !userRegister)}
          >
            change to {userRegister == true ? "Admin" : "User"} registeration{" "}
          </button>
        </p>

        <div id="registrationForm">
          <div className="input">
            <div>
              <label>
                enter name:
                <input
                  type="text"
                  name="username"
                  maxLength={20}
                  minLength={4}
                  placeholder="username"
                  onChange={handleChange}
                  value={details.username}
                  required
                />{" "}
              </label>
            </div>
            <div>
              <label>
                enter password :
                <input
                  maxLength={20}
                  minLength={4}
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  required
                  value={details.password}
                />
              </label>
            </div>
          </div>
          <div>
            <button className="submit" type="submit">
              submit
            </button>
          </div>
        </div>
        <p>
          <span style={{ color: "green" }}>
            {axiosResponse && axiosResponse}
          </span>
          <br />
          already have an account ? <Link to="/login">loginHere</Link>!
        </p>
      </form>
    </div>
  );
};

export default Register;
