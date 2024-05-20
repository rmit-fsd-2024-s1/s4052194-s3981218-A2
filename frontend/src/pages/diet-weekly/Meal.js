import React from "react";

function Meal({ meal }) {
    return (
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`} className="img-fluid rounded-start" alt={meal.title} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{meal.title}</h5>
                        <p className="card-text">Preparation time: {meal.readyInMinutes} minutes</p>
                        <p className="card-text">Servings: {meal.servings}</p>
                        <a href={meal.sourceUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View Recipe</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meal;