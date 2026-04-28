function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "index.html";
  }
}

async function loadApplications() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/applications`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    const container = document.getElementById("applications");

    // ❌ error from backend
    if (!response.ok) {
      container.innerText = data.message || "Failed to load";
      return;
    }

    // 📭 no applications
    if (data.length === 0) {
      container.innerHTML = "<p>No applications found</p>";
      return;
    }

    // ✅ show data
    container.innerHTML = "";

    data.forEach(app => {
      const div = document.createElement("div");

      div.innerHTML = `
        <div style="border:1px solid #ccc; padding:10px; margin:10px;">
          <p><b>ID:</b> ${app.application_id}</p>
          <p><b>Status:</b> ${app.status}</p>
        </div>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    document.getElementById("applications").innerText = "Server error";
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// 🚀 RUN ON PAGE LOAD
checkAuth();
loadApplications();