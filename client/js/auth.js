async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("message");
    const btn = document.querySelector("button");

    // 🔹 Clear old message
    msg.innerText = "";
    msg.className = "message";

    // 🔹 Basic validation
    if (!email || !password) {
        msg.innerText = "Please enter email and password";
        msg.classList.add("error");
        return;
    }

    try {
        // 🔹 Disable button while loading
        btn.disabled = true;
        btn.innerText = "Logging in...";

        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        console.log("LOGIN RESPONSE:", data);
        console.log("TOKEN RECEIVED:", data.access_token);

        if (response.ok) {
            // ✅ Save token
            localStorage.setItem("token", data.access_token);

            msg.innerText = "Login successful";
            msg.classList.add("success");

            // 🔹 Redirect
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {
            msg.innerText = data.message || "Invalid email or password";
            msg.classList.add("error");
        }

    } catch (error) {
        console.error(error);
        msg.innerText = "Server error. Please try again.";
        msg.classList.add("error");
    } finally {
        // 🔹 Enable button again
        btn.disabled = false;
        btn.innerText = "Login";
    }
}