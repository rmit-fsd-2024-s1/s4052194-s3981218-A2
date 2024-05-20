import React, { useState } from "react";
import "../style/UserDetailsForm.css";

const UserDetailsForm = ({ onDetailsSubmit }) => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("");
  const [healthGoal, setHealthGoal] = useState("");

  const activityLevels = ["lightly", "moderately", "very", "extreme"];
  const healthGoals = ["loose weight", "maintain", "gain muscle"];
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //error handling in activity level and health goal
    let optionErrors = {};
    if (!activityLevel) {
      optionErrors.activityLevel = "Activity Level is required";
    }
    if (!healthGoal) {
      optionErrors.healthGoal = "Health Goeal is required";
    }
    //checking if there are any errors related to no selecting an option
    if (Object.keys(optionErrors).length > 0) {
      setErrors(optionErrors);
      return;
    }

    onDetailsSubmit({ age, weight, height, gender, activityLevel, healthGoal });
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">
              Weight (kg)
            </label>
            <input
              type="number"
              className="form-control"
              id="weight"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="height" className="form-label">
              Height (cm)
            </label>
            <input
              type="number"
              className="form-control"
              id="height"
              placeholder="Enter height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label me-3">Activity Level</label>
            <div className="btn-group" role="group" aria-label="Activity level">
              {activityLevels.map((level) => (
                <input
                  type="button"
                  key={level}
                  className={`btn ${
                    activityLevel === level
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  value={level}
                  onClick={() => {
                    setActivityLevel(level);
                    if (errors.activityLevel) {
                      setErrors({ ...errors, activityLevel: "" });
                    }
                  }}
                />
              ))}
            </div>
            {errors.activityLevel && (
              <div className="text-danger">{errors.activityLevel}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label me-4">Health Goal</label>
            <div className="btn-group" role="group" aria-label="Health goal">
              {healthGoals.map((goal) => (
                <input
                  type="button"
                  key={goal}
                  className={`btn ${
                    healthGoal === goal ? "btn-success" : "btn-outline-success"
                  }`}
                  value={goal}
                  onClick={() => {
                    setHealthGoal(goal);
                    if (errors.healthGoal) {
                      setErrors({ ...errors, healthGoal: "" });
                    }
                  }}
                />
              ))}
            </div>
            {errors.healthGoal && (
              <div className="text-danger">{errors.healthGoal}</div>
            )}
          </div>

          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
