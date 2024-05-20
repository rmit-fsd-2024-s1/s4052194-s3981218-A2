//daily
//import React from 'react';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MealList from "./MealList";

function DailyMealPlan() {
    const location = useLocation();
    // const [calories] = useState(location.state?.calories);
    // const [mealData, setMealData] = useState(null);
    const mealData = location.state?.mealData; //new

  // useEffect(() => {
  //     const getMealData = async () => {
  //         try {
  //             const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=8a12156a2efc4af5ab5d13250fc22c9a&timeFrame=day&targetCalories=${calories}`);
  //             const data = await response.json();
  //             setMealData(data);
  //         } catch (error) {
  //             console.error('Error fetching meal data:', error);
  //         }
  //     };
  //     getMealData();
  // }, [calories]); // dependencies as calories, whenever calorie amount change useEffect comes to action

    useEffect(() => {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if(activeUser && activeUser.email && mealData){
            localStorage.setItem(`${activeUser.email}_mealPlanDaily`, JSON.stringify(mealData))
        }
    },[mealData]);

  return (
    <div
      className="Meal-plan"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      {/*Loading Meal Data from MealList */}
      {mealData ? (
        <MealList mealData={mealData} />
      ) : (
        <p>Loading meal plan...</p>
      )}
    </div>
  );
}

export default DailyMealPlan;
