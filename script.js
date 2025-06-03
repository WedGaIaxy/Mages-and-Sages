document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".bar-container");
  const raceSelect = document.getElementById("race");

  const defaultColor = "steelblue";
  const raceSegmentMap = {
    human: [3, 3, 3, 2],
    orc: [4, 4, 2, 2],
    elf: [2, 2, 3, 3]
  };

  const barStates = [];

  bars.forEach((container, index) => {
    const bar = container.querySelector(".bar");
    const buttons = container.querySelectorAll("button");
    const color = bar.dataset.color || defaultColor;

    let segments = 5;
    let subPerSegment = raceSegmentMap[raceSelect.value][index];
    let totalSubsegments = segments * subPerSegment;
    let activeSubsegments = totalSubsegments;

    function renderBar() {
      bar.innerHTML = "";
      for (let i = 0; i < totalSubsegments; i += subPerSegment) {
        const group = document.createElement("div");
        group.classList.add("segment-group");

        for (let j = 0; j < subPerSegment; j++) {
          const subIndex = i + j;
          const sub = document.createElement("div");
          sub.classList.add("segment");
          sub.style.backgroundColor = subIndex < activeSubsegments ? color : "grey";
          group.appendChild(sub);
        }

        bar.appendChild(group);
      }
    }

    function greyOut() {
      const subs = bar.querySelectorAll(".segment");
      for (let i = activeSubsegments - 1; i >= 0; i--) {
        if (subs[i].style.backgroundColor !== "grey") {
          subs[i].style.backgroundColor = "grey";
          activeSubsegments--;
          saveState();
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
          saveState();
          break;
        }
      }
    }

    function saveState() {
      const allData = JSON.parse(localStorage.getItem("barData") || "{}");
      allData[index] = {
        segments,
        subPerSegment,
        activeSubsegments
      };
      localStorage.setItem("barData", JSON.stringify(allData));
    }

    function loadState() {
      try {
        const allData = JSON.parse(localStorage.getItem("barData"));
        if (allData && allData[index]) {
          segments = allData[index].segments;
          subPerSegment = allData[index].subPerSegment;
          totalSubsegments = segments * subPerSegment;
          activeSubsegments = allData[index].activeSubsegments;
        }
      } catch (e) {
        console.warn("No saved data or invalid JSON in localStorage.");
      }
    }

    function setSubPerSegment(val, reset = false) {
      subPerSegment = val;
      if (reset) segments = 5;
      totalSubsegments = segments * subPerSegment;
      activeSubsegments = totalSubsegments;
      renderBar();
      saveState();
    }

    buttons[0].addEventListener("click", () => {
      if (segments < 10) {
        segments++;
        totalSubsegments = segments * subPerSegment;
        activeSubsegments = totalSubsegments;
        renderBar();
        saveState();
      }
    });

    buttons[1].addEventListener("click", () => {
      if (segments > 1) {
        segments--;
        totalSubsegments = segments * subPerSegment;
        activeSubsegments = Math.min(activeSubsegments, totalSubsegments);
        renderBar();
        saveState();
      }
    });

    buttons[2].addEventListener("click", greyOut);
    buttons[3].addEventListener("click", restore);

    barStates.push({ setSubPerSegment });

    loadState();
    renderBar();
  });

  raceSelect.addEventListener("change", () => {
    const selectedRace = raceSelect.value;
    const subCounts = raceSegmentMap[selectedRace];

    barStates.forEach((state, i) => {
      state.setSubPerSegment(subCounts[i], true);
    });
  });
});

