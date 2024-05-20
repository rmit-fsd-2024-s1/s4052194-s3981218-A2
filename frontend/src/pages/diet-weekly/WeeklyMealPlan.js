//weekly
//import React from 'react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealList from './MealList';

function WeeklyMealPlan() {
    const location = useLocation();
    const mealData = location.state?.mealData; //new

    useEffect(() => {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if(activeUser && activeUser.email && mealData){
            localStorage.setItem(`${activeUser.email}_mealPlanWeekly`, JSON.stringify(mealData))
        }
    },[mealData]);

    return (
        <div className="container mt-5">
            <h1>Weekly Meal Overview</h1>
            {mealData ? (
                Object.entries(mealData).map(([day, data]) => (
                    <div key={day}>
                        <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
                        <MealList dayData={data} />
                    </div>
                ))
            ) : (
                <p>No meal plan data available.</p>
            )}
        </div>
    );
}

export default WeeklyMealPlan;
