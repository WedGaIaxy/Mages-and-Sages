document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".bar-container");

  bars.forEach((container, index) => {
    const bar = container.querySelector(".bar");
    const buttons = container.querySelectorAll("button");
    const color = bar.dataset.color || "steelblue";
    let totalSubsegments = 15; // 5 segments × 3 subsegments

    function renderBar() {
      bar.innerHTML = "";
      for (let i = 0; i < totalSubsegments; i += 3) {
        const group = document.createElement("div");
        group.classList.add("segment-group");

        for (let j = 0; j < 3; j++) {
          const index = i + j;
          if (index >= totalSubsegments) break;

          const sub = document.createElement("div");
          sub.classList.add("segment");
          sub.style.backgroundColor = index < activeSubsegments ? color : "grey";
          group.appendChild(sub);
        }
        bar.appendChild(group);
      }
    }

    let activeSubsegments = 15; // Initially all active

    function greyOut() {
      const subs = bar.querySelectorAll(".segment");
      for (let i = activeSubsegments - 1; i >= 0; i--) {
        if (subs[i].style.backgroundColor !== "grey") {
          subs[i].style.backgroundColor = "grey";
          activeSubsegments--;
          break;
        }
      }
    }

    function restore() {
      const subs = bar.querySelectorAll(".segment");
      for (let i = 0; i < totalSubsegments; i++) {
        if (subs[i].style.backgroundColor === "grey") {
          subs[i].style.backgroundColor = color;
          activeSubsegments++;
          break;
        }
      }
    }

    // Increase = +3 subsegments (1 visual segment)
    buttons[0].addEventListener("click", () => {
      if (totalSubsegments < 30) {
        totalSubsegments += 3;
        activeSubsegments += 3;
        renderBar();
      }
    });

    // Decrease = -3 subsegments (1 visual segment)
    buttons[1].addEventListener("click", () => {
      if (totalSubsegments > 3) {
        totalSubsegments -= 3;
        activeSubsegments = Math.min(activeSubsegments, totalSubsegments);
        renderBar();
      }
    });

    buttons[2].addEventListener("click", greyOut);
    buttons[3].addEventListener("click", restore);

    renderBar();
  });
});
