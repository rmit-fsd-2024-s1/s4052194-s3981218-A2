import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../services/verify";
import "../../style/myprofilestyle.css";
import Swal from "sweetalert2";
import userService from "../../services/userService";
import profile_image from "../../assets/profile_image.jpg";

function MyProfile(props) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // State to manage user data
  const [user, setUser] = useState({
    user_id: "",
    username: "",
    email: "",
    password: "",
    date_joined: "",
  });

  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [error, setError] = useState(""); // State for errors
  const [usernameError, setUsernameError] = useState(""); // State for username error
  const [isUpdated, setIsUpdated] = useState(false); // State for update status

  // Fetch user data on component mount
  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser) {
      userService.getUserById(activeUser.user_id)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Handle new password change
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError("");
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  // Handle username change
  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
    setUsernameError("");
  };

  // Handle account deletion
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
        userService.deleteUser(user.user_id)
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

  // Handle saving changes
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

    userService.checkUsername(user.username)
      .then((response) => {
        if (response.exists && response.user_id !== user.user_id) {
          setUsernameError("This username is already used.");
        } else {
          userService.updateUser(user.user_id, updateData)
            .then(() => {
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
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <img src={profile_image} className="img-fluid" alt="Profile" />
              <h3 className="mt-3">{user.username}</h3>
              <p className="text-muted">@{user.username}</p>
              <button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
              <p className="mt-3"><strong>Member Since:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Edit Profile</h3>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={user.username}
                    onChange={handleUsernameChange} // Handle username change
                  />
                  {usernameError && <p className="text-danger">{usernameError}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={user.email}
                    disabled // Email is read-only
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange} // Handle new password change
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} // Handle confirm password change
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary btn-save">Save Changes</button>
              </form>
              {isUpdated && (
                <div className="alert alert-success" role="alert">
                  Profile updated successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
