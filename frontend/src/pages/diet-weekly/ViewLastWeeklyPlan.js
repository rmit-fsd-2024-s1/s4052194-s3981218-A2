import React, { useState, useEffect } from 'react';

function ViewLastWeeklyMealPlan() {
    const [weeklyMealPlan, setWeeklyMealPlan] = useState(null);

    useEffect(() => {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser && activeUser.email) {
            const storedPlanKey = `${activeUser.email}_mealPlanWeekly`;
            const storedPlan = localStorage.getItem(storedPlanKey);
            if (storedPlan) {
                const parsedPlan = JSON.parse(storedPlan);
                setWeeklyMealPlan(parsedPlan);
                console.log("Retrieved weekly meal plan:", parsedPlan);
            } else {
                console.log("No weekly meal plan found under the key:", storedPlanKey);
            }
        } else {
            console.log("No active user found.");
        }
    }, []);

    if (!weeklyMealPlan) {
        return <div className="container mt-3"><h2>No Weekly Meal Plan Found</h2></div>;
    }

    return (
        <div className="container mt-3">
            <h2>Weekly Meal Plan Overview</h2>
            {Object.entries(weeklyMealPlan).map(([day, data]) => (
                <div key={day}>
                    <h3>{day.charAt(0).toUpperCase() + day.slice(1)}'s Meals</h3>
                    <ul className="list-group">
                        {data.meals.map((meal, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{meal.title}</strong> - Prep time: {meal.readyInMinutes} mins - Servings: {meal.servings}
                                <br />
                                <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary mt-2">View Recipe</a>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3">
                        <strong>Nutritional Summary:</strong>
                        <ul>
                            <li>Calories: {data.nutrients.calories.toFixed(2)}</li>
                            <li>Protein: {data.nutrients.protein.toFixed(2)}g</li>
                            <li>Fat: {data.nutrients.fat.toFixed(2)}g</li>
                            <li>Carbohydrates: {data.nutrients.carbohydrates.toFixed(2)}g</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ViewLastWeeklyMealPlan;
