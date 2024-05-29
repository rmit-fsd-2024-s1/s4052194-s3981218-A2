export function calculateTheMostReview(showLatestReviews) {
  let products = {};
  showLatestReviews.forEach((e) => {
    if (e.score) {
      if (e.product) {
        let product_name = e.product.product_name;
        if (!products.hasOwnProperty(product_name)) {
          products[product_name] = {
            score: e.score,
            count: 1,
            avg: e.score,
          };
        } else {
          products[product_name].score += e.score;
          products[product_name].count += 1;
          products[product_name].avg =
            products[product_name].score / products[product_name].count;
        }
      }
    }
  });
  //sort the reviews
  let sortReviews = Object.entries(products).sort(
    (before, after) => after[1].avg - before[1].avg
  );
  return sortReviews;
}

export function calculateCountProductReview(showLatestReviews) {
  let products = {};
  showLatestReviews.forEach((e) => {
    if (e.score) {
      if (e.product) {
        let product_name = e.product.product_name;
        if (!products.hasOwnProperty(product_name)) {
          products[product_name] = {
            score: e.score,
            count: 1,
            avg: e.score,
          };
        } else {
          products[product_name].score += e.score;
          products[product_name].count += 1;
        }
      }
    }
  });
}