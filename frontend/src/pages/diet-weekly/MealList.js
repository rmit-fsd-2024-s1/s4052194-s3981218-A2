import React from "react";
import Meal from "./Meal";

function MealList({dayData}){
    return (
        <div>
            <h3>Meals for the Day:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {dayData.meals.map(meal => (
                    <Meal key={meal.id} meal={meal} />
                ))}
            </div>
            <div className="nutritional-info">
                <h4>Nutritional Summary:</h4>
                <ul>
                    <li>Total Calories: {dayData.nutrients.calories.toFixed(0)}</li>
                    <li>Carbohydrates: {dayData.nutrients.carbohydrates.toFixed(0)}g</li>
                    <li>Fat: {dayData.nutrients.fat.toFixed(0)}g</li>
                    <li>Protein: {dayData.nutrients.protein.toFixed(0)}g</li>
                </ul>
            </div>
        </div>
    );
}
export default MealList;