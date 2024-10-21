document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Load existing users from local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Sign up event listener
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      // Check if user already exists
      if (users.some((user) => user.email === email)) {
        document.getElementById("signupMessage").textContent =
          "Email already registered!";
        return;
      }

      // Add new user to the users array
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));

      document.getElementById("signupMessage").textContent =
        "Sign up successful!";
        localStorage.setItem("currentUserEmail", email);
        window.location.href = "movies.html"; // Redirect after successful login
      // Optionally redirect to movies page after successful signup
      // window.location.href = "movies.html"; // Uncomment to redirect
    });

  }

  // Login event listener
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      // Check if the user exists and the password matches
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert("Welcome back!");
        localStorage.setItem("currentUserEmail", user.email);
        window.location.href = "movies.html"; // Redirect after successful login
      } else {
        alert("Invalid email or password!");
      }
    });
  }
});
