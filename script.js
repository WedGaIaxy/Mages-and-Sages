document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".bar-container");

  bars.forEach((container, index) => {
    const bar = container.querySelector(".bar");
    const buttons = container.querySelectorAll("button");
    const color = bar.dataset.color || "steelblue";
    let segments = 5;

    function renderBar() {
      bar.innerHTML = "";
      for (let i = 0; i < segments; i++) {
        const segment = document.createElement("div");
        segment.classList.add("segment");
        segment.style.backgroundColor = color;
        bar.appendChild(segment);
      }
    }

    function greyOut() {
      const allSegments = bar.querySelectorAll(".segment");
      for (let i = allSegments.length - 1; i >= 0; i--) {
        const seg = allSegments[i];
        if (seg.style.backgroundColor !== "grey") {
          seg.style.backgroundColor = "grey";
          break;
        }
      }
    }

    function restore() {
      const allSegments = bar.querySelectorAll(".segment");
      for (let i = 0; i < allSegments.length; i++) {
        const seg = allSegments[i];
        if (seg.style.backgroundColor === "grey") {
          seg.style.backgroundColor = color;
          break;
        }
      }
    }

    // Button functionality
    buttons[0].addEventListener("click", () => {
      if (segments < 10) segments++;
      renderBar();
    });

    buttons[1].addEventListener("click", () => {
      if (segments > 1) segments--;
      renderBar();
    });

    buttons[2].addEventListener("click", greyOut);
    buttons[3].addEventListener("click", restore);

    renderBar();
  });
});
