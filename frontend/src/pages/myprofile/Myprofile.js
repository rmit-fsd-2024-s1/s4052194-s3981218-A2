import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { validatePassword } from "../../services/verify";
import "../../style/myprofilestyle.css";

function MyProfile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    dateJoined: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser) {
      setUser(activeUser);
    } else {
      //handling the absence of an active user
      navigate("/");
    }
  }, [navigate]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    // Clear the error message when the user starts typing in the New Password field
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Clear the error message when the user starts typing in the Confirm New Password field
    setError("");
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("This action cannot be undone!");
    if (isConfirmed) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updateDeleteUser = users.filter((u) => u.email !== user.email);

      localStorage.setItem("users", JSON.stringify(updateDeleteUser));
      localStorage.removeItem("activeUser");

      navigate("/");
      window.location.reload();
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    //validating the new password
    if (!validatePassword(newPassword)) {
      setError("New password does not meet requirements.");
      return;
    }

    //confirming the new password and confirm password is same
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    //hashing new password and storing back in the local storage
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? { ...u, name: user.name, password: hashedPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "activeUser",
      JSON.stringify({ ...user, password: hashedPassword })
    );

    //changing the state of isUpdated
    setIsUpdated(true);

    //setting a timer for profile update message and reverting the isUpdated state
    setTimeout(() => {
      setIsUpdated(false);
      setNewPassword("");
      setConfirmPassword("");
    }, 2000);
    //        alert('Profile updated successfully!');
  };

  return (
    <div className="container mt-3">
      <h2>My Profile</h2>
      <p>Joined on {user.dateJoined}</p>
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
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
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
            required
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
