async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // save token
      localStorage.setItem("token", data.access_token);

      document.getElementById("message").innerText = "Login successful";

      // redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    } else {
      document.getElementById("message").innerText = data.message || "Login failed";
    }

  } catch (error) {
    console.error(error);
    document.getElementById("message").innerText = "Server error";
  }
}