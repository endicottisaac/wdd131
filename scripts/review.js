// increment review count in local storage and display it when page loads
document.addEventListener("DOMContentLoaded", function () {
  const reviewCountSpan = document.getElementById("reviewCount");

  if (reviewCountSpan) {
    let reviewCount = localStorage.getItem("reviewCount");

    if (reviewCount === null) {
      reviewCount = 0;
    }

    reviewCount = parseInt(reviewCount) + 1;

    localStorage.setItem("reviewCount", reviewCount);

    reviewCountSpan.textContent = reviewCount;
  }
});
