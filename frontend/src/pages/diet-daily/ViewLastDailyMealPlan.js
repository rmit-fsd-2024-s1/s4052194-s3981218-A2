import React, { useEffect, useState } from "react";

function ViewLastMealPlan() {
  const [lastMealPlan, setLastMealPlan] = useState(null);

    useEffect(() => {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser && activeUser.email) {
            const savedMealPlan = JSON.parse(localStorage.getItem(`${activeUser.email}_mealPlanDaily`));
            setLastMealPlan(savedMealPlan);
        }
    }, []);

  if (!lastMealPlan) return <div>No last meal plan found!</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Last Meal Plan</h2>
      <div className="row">
        <div className="col">
          <ul className="list-group mb-4">
            <li className="list-group-item active">Nutritional Summary</li>
            <li className="list-group-item">
              Total Calories: {lastMealPlan.nutrients.calories}
            </li>
            <li className="list-group-item">
              Total Carbohydrates: {lastMealPlan.nutrients.carbohydrates}g
            </li>
            <li className="list-group-item">
              Total Fat: {lastMealPlan.nutrients.fat}g
            </li>
            <li className="list-group-item">
              Total Protein: {lastMealPlan.nutrients.protein}g
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <h3 className="mb-3">Meals:</h3>
        {lastMealPlan.meals.map((meal, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{meal.title}</h5>
                <p className="card-text">
                  Preparation time: {meal.readyInMinutes} minutes
                </p>
                <p className="card-text">Number of servings: {meal.servings}</p>
              </div>
              <div className="card-footer">
                <a
                  href={meal.sourceUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewLastMealPlan;
