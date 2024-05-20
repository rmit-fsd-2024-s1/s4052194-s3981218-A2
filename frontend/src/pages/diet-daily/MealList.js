import React from "react";
import Meal from "./Meal";

function MealList({mealData}) {
    const nutrients = mealData.nutrients;
    //console.log(mealData);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "0vh",
      }}
    >
      <section
        className="nutrients"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <h1>Macros</h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>Calories: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section
        className="meals"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {mealData.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}

export default MealList;
