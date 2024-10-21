import { Movie } from "./classes.js";
import { Package } from "./classes.js";
import { movies } from "./movies.js";

function displayMovies() {
  const moviesList = document.getElementById("moviesList");

  movies.forEach((movieData) => {
    // Create a new Movie object
    const movie = new Movie(
      movieData.title,
      movieData.price,
      movieData.director,
      movieData.genre,
      movieData.year,
      movieData.description,
      movieData.airTime
    );

    const li = document.createElement("div");
    li.innerHTML = `
    <div class="movie-div">
    <strong>${movie.title}</strong> - $${movie.price.toFixed(2)}<br>
    <em>Directed by ${movie.director}</em><br>
    <span>${movie.genre} (${movie.year})</span><br>
    <p>${movie.description[0]}</p>
    </div>
`;

    // Button to navigate to the movie details page
    const detailsButton = document.createElement("button");
    detailsButton.innerText = "View Details";

    // Create the URL for the movie details page
    const movieTitleEncoded = encodeURIComponent(movie.title); // Encodes special characters
    detailsButton.addEventListener("click", () => {
      window.location.href = `http://localhost:5501/Pages/moviedes.html?movie=${movieTitleEncoded}`;
    });

    li.appendChild(detailsButton);

    // Button to add to cart
    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy Ticket";
    buyButton.addEventListener("click", () => addToCart(movie));

    li.appendChild(buyButton);
    moviesList.appendChild(li);
  });
}

// Function to add a movie to the user's cart
function addToCart(movie) {
  let packageElem = new Package(movie);
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  if (!currentUserEmail) {
    alert("Please log in to add items to your cart.");
    return;
  }

  // Retrieve the current cart or initialize an empty array
  const cartKey = `cart_${currentUserEmail}`; // Unique key for the user's cart
  const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Add the new movie to the cart

  currentCart.push(packageElem);

  // Save the updated cart back to local storage
  localStorage.setItem(cartKey, JSON.stringify(currentCart));

  alert(`${packageElem.movie.title} has been added to your cart!`);
}

displayMovies();
