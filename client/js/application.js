function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

async function submitApplication() {
  const token = localStorage.getItem("token");

  const title = document.getElementById("title").value;
  const type = document.getElementById("type").value;

  if (!title || !type) {
    document.getElementById("message").innerText = "All fields required";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        type: type
      })
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("message").innerText = data.message;
      return;
    }

    document.getElementById("message").innerText = "Application submitted!";

    // redirect after 1 sec
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (err) {
    document.getElementById("message").innerText = "Server error";
  }
}