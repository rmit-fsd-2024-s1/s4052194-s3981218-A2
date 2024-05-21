import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../services/verify";
import "../../style/myprofilestyle.css";
import axios from "axios";
import Swal from "sweetalert2";

function MyProfile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_id: "",
    username: "",
    email: "",
    password: "",
    date_joined: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser) {
      axios
        .get(`http://localhost:4000/api/users/${activeUser.user_id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
    setUsernameError("");
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/api/users/${user.user_id}`)
          .then(() => {
            localStorage.removeItem("activeUser");
            window.location.reload();
            setTimeout(() => {
              Swal.fire("Deleted!", "Your account has been deleted.", "success");
            }, 2000);
          })
          .catch((error) => {
            console.error("Error deleting user account:", error);
            Swal.fire("Error!", "There was an error deleting your account.", "error");
          });
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (newPassword || confirmPassword) {
      if (!validatePassword(newPassword)) {
        setError("New password does not meet requirements.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    const updateData = {
      username: user.username,
      email: user.email,
    };

    if (newPassword) {
      updateData.password = newPassword;
    }

    axios
      .get(`http://localhost:4000/api/users/username/${user.username}`)
      .then((response) => {
        if (response.data.exists && response.data.user_id !== user.user_id) {
          setUsernameError("This username is already used.");
          return;
        } else {
          axios
            .put(`http://localhost:4000/api/users/${user.user_id}`, updateData)
            .then((response) => {
              localStorage.setItem(
                "activeUser",
                JSON.stringify({ user_id: user.user_id, name: user.username })
              );
              setIsUpdated(true);
              setTimeout(() => {
                setIsUpdated(false);
                setNewPassword("");
                setConfirmPassword("");
              }, 2000);
            })
            .catch((error) => {
              console.error("Error updating user profile:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking username:", error);
      });
  };

  return (
    <div className="container mt-3">
      <h2>My Profile</h2>
      <p>Joined on {new Date(user.date_joined).toLocaleDateString()}</p>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={user.username}
            onChange={handleUsernameChange}
          />
          {usernameError && <p className="text-danger">{usernameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="my-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary btn-save">
            Save Changes
          </button>
          <div>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-danger ms-3"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </form>
      {isUpdated && (
        <div className="text-center">
          <p>Profile updated successfully!</p>
        </div>
      )}
    </div>
  );
}
export default MyProfile;
