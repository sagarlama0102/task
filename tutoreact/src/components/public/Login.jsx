
// export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import {API} from "../../environment";
import axios from "axios";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const navigate = useNavigate();

  const onSubmitLogin = (data) => {
    console.log("Login Data:", data);
    axios
            .post(`${API.BASE_URL}/api/auth/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                // Log the entire response to inspect the structure
                // console.log("Login Response:", response.data.data.access_token);

                // Check if access_token exists inside response.data
                if (response.data && response.data.data.access_token) {
                  //login token extra code 
                    console.log("Access Token:", response.data.data.access_token);
                  //
                    localStorage.setItem("token", response.data.data.access_token); // Store Token
                    toast.success("Login successful");
                    navigate("/DashboardLayout");

                } else {
                    toast.error("Login failed! Check credentials.");
                }
            })
            .catch((error) => {
                console.error("Error logging in:", error);
                toast.error("Error logging in. Please try again.");
            });

  };

  const onSubmitRegister = (data) => {
    console.log("Registration Data:", data);
    // alert(`Registration Successful: ${JSON.stringify(data)}`);
    axios.post(`${API.BASE_URL}/api/user`, data, {
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then((response) => {
          // console.log("signup response: ", response);
          if (response.status === 201) {
              toast.success("Signup successful");
          } else {
              toast.error("Signup failed");
          }
      })
      .catch((error) => {
          console.error("error", error);
          toast.error("Error signing up");
      });
  };

  return (
    <div className="Main-container">
      <div className={`container ${isLogin ? "active" : ""}`}>
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 4, message: "Minimum length is 4" },
                })}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="error-container">
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum length is 6" },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                    message: "Password must include letters and numbers",
                  },
                })}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="error-container">
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>

        {/* Registration Form */}
        <div className="form-box register">
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <h1>Register Now!</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 4, message: "Minimum length is 4" },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only letters and numbers allowed",
                  },
                })}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="error-container">
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="error-container">
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum length is 6" },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                    message: "Password must include letters and numbers",
                  },
                })}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="error-container">
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
                })}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="error-container">
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>

        {/* Toggle Section */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Welcome to TaskHub</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={toggleForm}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={toggleForm}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;