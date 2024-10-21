import { movies } from './movies.js';

// Function to get the movie title from the URL
function getMovieTitleFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('movie'); 
}

// Function to display movie details
function displayMovieDetails(movieTitle) {
    const movieContainer = document.getElementById('movie-container');
    const movie = movies.find(m => m.title.toLowerCase() === movieTitle.toLowerCase());

    if (movie) {
        movieContainer.innerHTML = `
            <div class="movie-div">
            <h1>${movie.title}</h1>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Price:</strong> $${movie.price.toFixed(2)}</p>
            <p><strong>Description:</strong> ${movie.description[1]}</p>
            <p><strong>Air Time:</strong> ${movie.airTime}</p>
            </div>
        `;
    } else {
        movieContainer.innerHTML = `<p>Movie not found!</p>`;
    }
}

// Main function to run on page load
function main() {
    const movieTitle = getMovieTitleFromURL();
    if (movieTitle) {
        displayMovieDetails(movieTitle);
    } else {
        document.getElementById('movie-container').innerHTML = `<p>No movie selected.</p>`;
    }
}

// Call main on page load
document.addEventListener('DOMContentLoaded', main);
