export class Movie {
  constructor(title, price, director, genre, year, description, airTime) {
    this.title = title;
    this.price = price;
    this.director = director;
    this.genre = genre;
    this.year = year;
    this.description = description;
    this.airTime = airTime;
  }
}

export class Package {
  constructor(movie) {
    this.movie = movie; // Movie object
    this.tickets = 1; // Default to 1 ticket
    this.seats = []; // Array to hold seat numbers
  }

  setTickets(num) {
    this.tickets = num;
  }

  setSeats(seats) {
    this.seats = seats;
  }
}
