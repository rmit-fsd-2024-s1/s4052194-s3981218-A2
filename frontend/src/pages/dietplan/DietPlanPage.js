import React, { useState, useEffect } from "react";

import UserDetailsModal from "../../components/UserDetailsModal";
import { useNavigate, useLocation } from "react-router-dom";

const DietPlanPage = () => {
  const [userDetails, setUserDetails] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    activityLevel: "",
    healthGoal: "",
    bmrCalories: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [calories, setCalories] = useState("");
  const [caloriesError, setCaloriesError] = useState("");
  const navigate = useNavigate();

  //calculation is based on Harris-Benedict equation
  function calculateCalories(
    age,
    weight,
    height,
    activityLevel,
    gender,
    healthGoal
  ) {
    let cal;

    if (gender === "male") {
      cal = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      // calculation for female
      cal = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    const activityMultipliers = {
      lightly: 1.375,
      moderately: 1.55,
      very: 1.725,
      extreme: 1.9,
    };

    const multiplier = activityMultipliers[activityLevel];

    let calFinal = Math.round(cal * multiplier);

    switch (healthGoal) {
      case "loose weight":
        calFinal -= 500;
        break;
      case "gain muscle":
        calFinal += 500;
        break;
      case "maintain":
      default:
        break;
    }
    return calFinal;
  }

  const handleGetDailyMealPlan = async () =>{
    //required calories for navigation
    if (!calories || calories <= 0) {
      setCaloriesError("Please enter a valid amount");
      return;
    }
    // navigate('/mealplan', {state: {calories: calories}});
    // alert(calories);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=6a6056f6a75545e08e94e56bcb5754b9&timeFrame=day&targetCalories=${calories}`
      );
      const data = await response.json();
      //console.log(data);
      navigate('/dailymealplan', { state: { mealData: data } }); // Passing data via state
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  const handleGetWeeklyMealPlan = async () =>{
        //required calories for navigation
    if(!calories || calories <= 0){
      setCaloriesError("Please enter a valid amount");
      return;
    }
    try {
      const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=6a6056f6a75545e08e94e56bcb5754b9&timeFrame=week&targetCalories=${calories}`);
      const data = await response.json();
      //console.log(data.week);
      navigate('/weeklymealplan',{state: {mealData: data.week}})
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  const handleDetailsSubmit = (details) => {
    const calculatedCalories = calculateCalories(
      details.age,
      details.weight,
      details.height,
      details.activityLevel,
      details.gender,
      details.healthGoal
    );

    setCalories(calculatedCalories);

    setUserDetails({
      ...details,
      bmrCalories: calculatedCalories,
    });
    setModalIsOpen(false); // Closes the modal after submission
  };

  return (
<div className="container mt-5">
  <div className="row">
    <div className="col-md-8 mx-auto">
      <div className="card text-dark bg-light mb-3">
        <div className="card-header">Create Your Diet Plan</div>
        <div className="card-body">
          <h5 className="card-title">Enter Your Daily Calorie Goal</h5>
          <input
            className="form-control mb-3"
            type="number"
            placeholder="Enter Daily Calories"
            value={calories}
            onChange={(e) => {setCalories(e.target.value); setCaloriesError('');}}
            required
          />
          {caloriesError && <div className="text-danger">{caloriesError}</div>}
          <div className="button-container d-flex justify-content-between align-items-center my-3">
            <button className="btn btn-dark me-2" onClick={() => setModalIsOpen(true)}>Not Sure Amount Of Calories?</button>
            <button className="btn btn-primary me-2" onClick={handleGetDailyMealPlan}>Get Daily Meal Plan</button>
            <button className="btn btn-secondary me-2" onClick={() => navigate('/viewLastDailyMealPlan')}>View Last Daily Meal Plan</button>
            <button className="btn btn-primary me-2" onClick={handleGetWeeklyMealPlan}>Get Weekly Meal Plan</button>
            <button className="btn btn-secondary" onClick={() => navigate('/viewLastWeeklyMealPlan')}>View Last Weekly Meal Plan</button>
          </div>
          <UserDetailsModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            onDetailsSubmit={handleDetailsSubmit}
          />
        </div>
      </div>
      {userDetails && userDetails.bmrCalories && (
        <div className="card bg-light mb-3">
          <div className="card-header">Your Details</div>
          <div className="card-body">
            <p className="card-text">Age: {userDetails.age}</p>
            <p className="card-text">Weight: {userDetails.weight} kg</p>
            <p className="card-text">Height: {userDetails.height} cm</p>
            <p className="card-text">Activity Level: {userDetails.activityLevel}</p>
            <p className="card-text">Health Goal: {userDetails.healthGoal}</p>
            <p className="card-text">Calories Needed: {userDetails.bmrCalories}</p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default DietPlanPage;
