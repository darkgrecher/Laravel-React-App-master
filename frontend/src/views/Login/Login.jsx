import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../../contexts/contextprovider";
import axiosClient from "../../axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {
  const notifyErr = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  const { setUser, setToken } = useStateContext();

  const Submit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("ACCESS_TOKEN", data.token);

        if (data.user.role === "admin") {
          window.location.href = "/admin-dashboard";

        } else {
          window.location.href = "/user";
        }
      })
      .catch((err) => {
        notifyErr("Invalid Credentials");
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  

  return (
    
    <div className="login-signup-form animated fadeinDown">
      <ToastContainer />
      <div className="form">
        <h1 
          className="title"
          onClick={(message) => notifySuc("Logged In Successfully!")}
        >
          <div style={{ fontSize: "25px" }}>Login To Your Account</div>
        </h1>
        <br />
        <br />
        <form onSubmit={Submit}>
          <input ref={emailRef} type="email" placeholder="Email" style={{borderRadius: "10px" }} /><br /><br />
          <input ref={passwordRef} type="password" placeholder="Password" style={{ borderRadius: "10px" }}/><br /><br />
          {/* <button className="btn btn-block" style={{ backgroundColor: "black", borderRadius: "10px",color:"white" }}>Login</button> */}
          <button
            className="btn btn-block"
            style={{ backgroundColor: "black", borderRadius: "10px", color: "white" }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "black";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "black";
              e.target.style.color = "white";
            }}
          >
            Login
          </button>
          <br />
          <p className="message">
            Not Registered? <Link to="/register" style={{ color: "white", textDecoration: "none" }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Create a new account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
