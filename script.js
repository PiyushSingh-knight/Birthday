const music = document.getElementById("bg-music");
const buttons = document.querySelectorAll(".next-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentPage = button.closest(".page");
    const nextPageId = button.getAttribute("data-next");
    const nextPage = document.getElementById(nextPageId);

    // Change pages
    currentPage.classList.remove("active");
    nextPage.classList.add("active");

    // Start music on first click
    if (music.paused) {
      music.play().catch(() => {
        console.log("Autoplay blocked by browser, must click once.");
      });
    }

    // If second or fourth page is active, start flower fall
    if (nextPageId === "page2" || nextPageId === "page4") {
      startFlowerFall();
    }
  });
});

// Function to create falling flowers 🌸
function startFlowerFall() {
  const emojis = ["🌸", "🌷", "🌺", "🌹"];
  const interval = setInterval(() => {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 3 + Math.random() * 3 + "s";
    document.body.appendChild(flower);

    // Remove after falling
    setTimeout(() => {
      flower.remove();
    }, 6000);
  }, 300);

  // Stop flowers when leaving page 2 or page 4
  const observer = new MutationObserver(() => {
    if (
      !document.getElementById("page2").classList.contains("active") &&
      !document.getElementById("page4").classList.contains("active")
    ) {
      clearInterval(interval);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { attributes: true, subtree: true });
}
