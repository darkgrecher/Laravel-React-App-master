import { useEffect, useState } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { FourSquare } from "react-loading-indicators";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  const notifySuc = (message) => {
    toast.success(message, {
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

  useEffect(() => {
    if (!token) {
      return;
    }

    axiosClient
      .get("/me")
      .then(({ data }) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("ACCESS_TOKEN");
        setLoading(false);
      });
  }, [token, setUser, setToken]);

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient
      .get("/logout")
      .then(() => {
        notifySuc("Logged Out");

        setTimeout(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("ACCESS_TOKEN");
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Logout failed:", error.response.data);
        } else if (error.request) {
          console.error("Logout failed: No response received", error.request);
        } else {
          console.error("Logout failed:", error.message);
        }
      });
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    <FourSquare color="#9866fa" size="medium" text="Loading" textColor="" />;
  }

  return (
    <div id="defaultLayout">
      <ToastContainer />
      <div className="content">
        <header>
          <div>
            <span className="s-logo" onClick={()=>navigate('/')}>Learn Programming</span>
          </div>
          <div style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            {user ? user.name : "Loading..."}
            <a href="#" onClick={onLogout} className="btn-logout" >
              {" "}
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
