import React, { useState, useEffect } from "react";
//daily

function Meal({ meal }) {
  const [imgUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=6a6056f6a75545e08e94e56bcb5754b9&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
        console.log(imgUrl);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

  return (
    <div style={{ flex: "0 0 auto", margin: "10px" }}>
      {" "}
      {/* Adjust flex and margin as needed */}
      <div className="card" style={{ width: "18rem" }}>
        {imgUrl && (
          <img src={imgUrl} className="card-img-top" alt={meal.title} />
        )}
        <div className="card-body">
          <h5 className="card-title">{meal.title}</h5>
          <p className="card-text">
            Preparation time: {meal.readyInMinutes} minutes
          </p>
          <p className="card-text">Number of servings: {meal.servings}</p>
          <a href={meal.sourceUrl} className="btn btn-primary">
            Go to Recipe
          </a>
        </div>
      </div>
    </div>
  );
}

export default Meal;
