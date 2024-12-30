// src/views/AdminDashboard/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { FourSquare } from "react-loading-indicators";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

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


  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/user/${user.id}`).then(() => {
      getUsers();
      notifySuc("User Deleted Successfully!");
    });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setLoading(false);
        // Filter the admin
        const filteredUsers = data.data.filter((user) => user.name !== "Admin");
        setUsers(filteredUsers);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
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
          <h1 style={{ color: "white" }}>Welcome to Admin Dashboard</h1>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>
                <br></br>
              </h1>
              <div>
                
                <Link className="btn-add" to="/user/new">
                  Add New User
                </Link>
              </div>
            </div>
            <div className="card animated fadeInDown">
              <table>
                <thead>
                  <tr >
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <Link className="btn-edit" to={"/user/" + u.id}>
                          Edit
                        </Link>
                        &nbsp;
                        <button
                          className="btn-delete"
                          onClick={(ev) => onDeleteClick(u)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
