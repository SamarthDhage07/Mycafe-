


const video = document.getElementById("bgVideo");
const btn = document.getElementById("soundBtn");

btn.addEventListener("click", () => {

    if (video.muted) {
        // turn sound ON
        video.muted = false;
        video.volume = 1;
        video.play();
        btn.textContent = "🔇 Sound OFF";

    } else {
        // turn sound OFF
        video.muted = true;
        btn.textContent = "🔊 Sound ON";
    }

});










function filterMenu(category) {
    const cards = document.querySelectorAll(".menu-card");

    cards.forEach(card => {
        if (category === "all") {
            card.style.display = "block";
        } else if (card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

/**============================================================================ */

document.querySelectorAll(".menu-row").forEach((row, i) => {

    // duplicate enough times to avoid gap
    row.innerHTML += row.innerHTML;

    const speed = i === 0 ? 0.6 : -0.6; // opposite directions
    let pos = 0;

    function animate() {
        pos += speed;
        row.scrollLeft += speed;

        // reset when half width passed
        if (Math.abs(row.scrollLeft) >= row.scrollWidth / 2) {
            row.scrollLeft = 0;
        }

        requestAnimationFrame(animate);
    }

    animate();
});




/*=============================================================================== */

const title = document.getElementById("heroTitle");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    // control shrink speed
    let scale = 1 - (scrollY / 800);

    // limit minimum size
    if (scale < 0.5) scale = 0.5;

    title.style.transform = `scale(${scale})`;
});



/**============================================================================= */

// load saved status on page load
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".table-card").forEach(card => {
        const id = card.dataset.id;
        const saved = localStorage.getItem("table"+id);

        if (saved === "booked") {
            applyBooked(card);
        }
    });
});

function bookTable(id, btn) {
    const card = btn.closest(".table-card");

    if (localStorage.getItem("table"+id) === "booked") {
        alert("Already booked");
        return;
    }

    localStorage.setItem("table"+id, "booked");
    applyBooked(card);
}

function applyBooked(card) {
    const badge = card.querySelector(".badge");
    const btn = card.querySelector("button");

    badge.textContent = "Booked";
    badge.classList.remove("available");
    badge.classList.add("booked");

    btn.textContent = "Booked";
    btn.disabled = true;
}


/**======================================================================================================== */


document.addEventListener("DOMContentLoaded", function () {

  const text = "We started our cafe with one simple dream — to serve warm coffee and warmer moments. From fresh beans to handcrafted drinks, every cup carries passion and comfort.";

  let i = 0;
  const speed = 35;
  const target = document.getElementById("typing-text");

  function typeWriter() {
    if (!target) return; // safety check

    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();

});

/**======================================================================== */

// ===== Registration Logic =====
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("mycafe_token");

  if (!token) {
    document.getElementById("registerModal").style.display = "flex";
    document.body.style.overflow = "hidden";
  }
});

function registerCustomer() {
  const name = document.getElementById("custName").value.trim();
  const mobile = document.getElementById("custMobile").value.trim();

  if (name === "" || mobile.length !== 10) {
    alert("Enter valid name & mobile");
    return;
  }

  // Backend API call (later we connect real backend)
  fetch("http://localhost:8080/api/customers/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, mobile })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("mycafe_token", data.token);
    document.getElementById("registerModal").style.display = "none";
    document.body.style.overflow = "auto";
  })
  .catch(() => alert("Server error"));
}
