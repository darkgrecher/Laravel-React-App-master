import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";
import Data from "../data.json";
import { FourSquare } from "react-loading-indicators";

const User = () => {
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useStateContext();

  useEffect(() => {
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setLoading(false);
      });
  }, [setUser]);

  return (
    <>
      {loading && (
        <div className="loading-spin">
          <FourSquare
            color="#A294F9"
            size="medium"
            text="Loading"
            textColor=""
          />
        </div>
      )}
      {!loading && (
        <div>
          <h3 style={{ color: "white" }}>Welcome Back, Mr. {user.name}</h3>
          <br></br>
          <hr></hr>
          <br></br>
          <h1 style={{ color: "white" }}>Available Courses</h1>
          <br></br>
          <div className="s-cards">
            {Data &&
              Data.map((sub) => {
                return (
                  <div className="s-card">
                    <h3>{sub.Course}</h3>
                    <span>
                      Conduct by <b>{sub.Tutor}</b> <br />
                      <b>{sub.Skills}</b><br /> Per Month
                      
                      Every {sub.Enrolled}
                    </span>
                    <br></br>
                    <br></br>
                    <br />
                 
                  <button onClick={() => window.open(sub.officialWebsite, "_blank")}>Enroll for Free</button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <hr />
    </>
  );
};

export default User;
