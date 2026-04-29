function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "index.html";
    }
}

// 🎯 Status flow visualization
function getStatusBar(status) {
    const steps = ["SUBMITTED", "UNDER VERIFICATION", "APPROVED"];

    return steps.map(step => {
        let className = "step";

        if (step === status) className += " active";

        return `<span class="${className}">${step}</span>`;
    }).join(" → ");
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

        if (!response.ok) {
            container.innerText = data.message || "Failed to load";
            return;
        }

        if (data.length === 0) {
            container.innerHTML = "<p>No applications found</p>";
            return;
        }

        container.innerHTML = "";

        data.forEach(app => {
            const div = document.createElement("div");

            const id = app.application_id || app.id || "N/A";
            const status = app.status || "UNKNOWN";

            div.innerHTML = `
                <div class="card">
            <div class="card-header">
            <h3>Application #${id}</h3>
            <span class="status ${status.toLowerCase()}">${status}</span>
            </div>

            <div class="progress">
            ${getStatusBar(status)}
            </div>
        </div>
      `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error(error);
        document.getElementById("applications").innerText = "Server error";
    }
}
function getStatusClass(status) {
    if (status === "APPROVED") return "approved";
    if (status === "SUBMITTED") return "submitted";
    return "verification";
}
function goToNew() {
  window.location.href = "new-application.html";
}
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// 🚀 RUN ON PAGE LOAD
checkAuth();
loadApplications();