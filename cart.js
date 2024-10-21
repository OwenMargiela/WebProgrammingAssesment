// cart.js

document.addEventListener("DOMContentLoaded", () => {
  // Function to display the current user's email
  function displayCurrentUserEmail() {
    const currentUserEmail = localStorage.getItem("currentUserEmail");

    if (currentUserEmail) {
      const emailDisplayElement = document.getElementById("userEmailDisplay");
      emailDisplayElement.textContent = `Logged in as: ${currentUserEmail}`;
    } else {
      // Handle case where no user is logged in
      const emailDisplayElement = document.getElementById("userEmailDisplay");
      emailDisplayElement.textContent = "Not logged in.";
    }
  }

  // Call the function to display the email
  displayCurrentUserEmail();
});

function displayUserCart() {
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const cartKey = `cart_${currentUserEmail}`;
  const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
  const cartDisplayElement = document.getElementById("cartItemsDisplay");

  if (cartItems.length > 0) {
    cartDisplayElement.innerHTML = ""; // Clear previous content
    cartItems.forEach((pkg, index) => {
      const packageDiv = document.createElement("div");

      packageDiv.innerHTML = `
  <div class="package-div">
    <h3>${pkg.movie.title}</h3>
    <p>Original Price: $${pkg.movie.price.toFixed(2)}</p>
    <p>Seats: ${pkg.seats.join(", ")}</p>
    <p>Number of Tickets: <span id="ticketCount${index}">${
        pkg.tickets
      }</span></p>
    <p>Total Price: $<span id="totalPrice${index}">${(
        pkg.movie.price * pkg.tickets
      ).toFixed(2)}</span></p>
    <button id="increase-${index}">+</button>
    <button id="decrease-${index}">-</button>
    <button id="selectSeats-${index}">Select Seats</button>
    <button id="generateInvoice-${index}">Generate Invoice</button>
    <div id="seatSelectionDiv-${index}"></div>
  </div>
`;

      cartDisplayElement.appendChild(packageDiv);
      document
        .getElementById(`increase-${index}`)
        .addEventListener("click", () => {
          updateTicketCount(index, 1); // Increase ticket count by 1
        });

      document
        .getElementById(`decrease-${index}`)
        .addEventListener("click", () => {
          updateTicketCount(index, -1); // Decrease ticket count by 1
        });

      document
        .getElementById(`selectSeats-${index}`)
        .addEventListener("click", () => {
          createSeatSelection(pkg.tickets, pkg.movie.title, index); // Pass ticket count and movie title
        });

      document
        .getElementById(`generateInvoice-${index}`)
        .addEventListener("click", () => {
          generateInvoice(pkg); // Pass ticket count and movie title
        });
    });
  } else {
    cartDisplayElement.textContent = "Your cart is empty.";
  }
}
// cart.js

document.addEventListener("DOMContentLoaded", () => {
  displayUserCart();
});

function updateTicketCount(index, change) {
  console.log("Updating ticket count...", index, change);
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const cartKey = `cart_${currentUserEmail}`;

  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart[index].tickets += change;
  console.log(cart[index]);

  if (cart[index].tickets < 1) {
    alert("You must have at least one ticket.");
    cart[index].tickets = 1; // Reset to 1 if it goes below 1
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  displayUserCart();
}

function clearCart() {
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const cartKey = `cart_${currentUserEmail}`;
  cart = []; // Clear the cart array
  localStorage.removeItem(cartKey); // Remove cart from local storage, if applicable
  displayUserCart(); // Reload the cart display
  console.log("Cart has been cleared!");
}

document.getElementById("clearCartButton").addEventListener("click", clearCart);

function generateInvoice(pkg) {
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const invoiceContent = `
    Invoice for Ticket Purchase\n
    Person: ${currentUserEmail}\n
    Movie: ${pkg.movie.title}\n
    Director: ${pkg.movie.director}\n
    Genre: ${pkg.movie.genre} (${pkg.movie.year})\n
    Tickets: ${pkg.tickets}\n
    Seats: ${pkg.seats.join(", ")}\n
    Total Price: $${(pkg.movie.price * pkg.tickets).toFixed(2)}\n
`;

  const blob = new Blob([invoiceContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${pkg.movie.title}_invoice.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  clearCart();
}

function createSeatSelection(ticketCount, movieTitle, index) {
  const seatSelectionDiv = document.getElementById(`seatSelectionDiv-${index}`);
  seatSelectionDiv.innerHTML = ""; // Clear previous seats
  selectedSeats = []; // Reset selected seats for this package

  // Display movie title
  const titleElement = document.createElement("h2");
  titleElement.innerText = `Select Seats for ${movieTitle}`;
  seatSelectionDiv.appendChild(titleElement);

  // Create a flex container for the seats
  const seatContainer = document.createElement("div");
  seatContainer.style.display = "flex";
  seatContainer.style.flexWrap = "wrap";
  seatContainer.style.maxWidth = "350px";
  seatContainer.style.gap = "10px";

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
      const seat = document.createElement("div");
      seat.className = "seat available";
      seat.innerText = `${String.fromCharCode(65 + i)}${j}`;
      seat.onclick = function () {
        toggleSeatSelection(seat, ticketCount);
      };
      seatContainer.appendChild(seat); // Append each seat to the seatContainer
    }
  }

  seatSelectionDiv.appendChild(seatContainer);
  seatSelectionDiv.classList.remove("hidden");

  // Add a button to confirm seat selection
  const confirmSeatsButton = document.createElement("button");
  confirmSeatsButton.innerText = "Confirm Seats";
  confirmSeatsButton.onclick = function () {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const cartKey = `cart_${currentUserEmail}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    cart[index].seats = selectedSeats; // Save selected seats in the cart package
    localStorage.setItem(cartKey, JSON.stringify(cart)); // Update localStorage

    seatSelectionDiv.classList.add("hidden"); // Hide seat selection after confirmation
    location.reload();
  };
  seatSelectionDiv.appendChild(confirmSeatsButton);
}

function toggleSeatSelection(seat, ticketCount) {
  if (
    selectedSeats.length < ticketCount ||
    seat.classList.contains("selected")
  ) {
    seat.classList.toggle("selected");
    const seatLabel = seat.innerText;

    if (selectedSeats.includes(seatLabel)) {
      selectedSeats = selectedSeats.filter((s) => s !== seatLabel); // Deselect seat
    } else {
      selectedSeats.push(seatLabel); // Select seat
      console.log(selectedSeats);
    }
  } else {
    alert("You can only select " + ticketCount + " seats");
  }
}
