// Sahifa 01.10.2025 da yaratildi.✅
window.addEventListener("DOMContentLoaded", () => {
  const inputs = [...document.querySelectorAll(".input-code")],
    digits = document.querySelectorAll(".digit"),
    deleteBtn = document.querySelector(".delete"),
    clearBtn = document.querySelector(".clear"),
    backBtn = document.querySelector("#back-icon");
  backBtn.addEventListener("click", () => {
    history.back();
  });
  if (!inputs.length) return;
  // sahifa yuklanganda 1-inputni fokuslash
  if (inputs.length > 0) {
    inputs[0].focus();
  }
  // Instead of currentIndex:
  const getFocusedIndex = () => {
    return inputs.findIndex((i) => i === document.activeElement);
  };
  inputs.forEach((input, i) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    // BackspACE
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        if (input.value == "") {
          if (i > 0) {
            inputs[i - 1].focus();
            inputs[i - 1].value = "";
            e.preventDefault();
          }
        }
      } else if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        inputs[i - 1].focus();
      } else if (e.key === "ArrowRight" && i > 0) {
        e.preventDefault();
        inputs[i + 1].focus();
      }
    });
    // pasting on Mobile
    input.addEventListener("paste", (event) => {
      event.preventDefault();
      const paste = (event.clipboardData || window.clipboardData)
        .getData("text")
        .replace(/\D/g, "");
      paste.split("").forEach((ch, idx) => {
        if (i + idx < inputs.length) {
          inputs[i + idx].value = ch;
        }
      });
      const next = Math.min(i + paste.length, inputs.length - 1);
      inputs[next].focus();
    });
  });
  // KEYBOARD FOR MOBILE:
  digits.forEach((btn) => {
    btn.addEventListener("click", () => {
      // const focused = getFocusedIndex();
      let idx = getFocusedIndex();
      if (idx === -1) {
        idx = inputs.findIndex((inp) => inp.value === "");
        if (idx === -1) {
          idx = 0; // agar hammasi to'lgan bo'lsa
        }
      }
      inputs[idx].value = btn.textContent.trim().replace(/\D/g, "").slice(0, 1);
      if (idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });
  });
  // Delete button only one listener: [MOST IMPORTANT]
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      // const focused = getFocusedIndex();
      let idx = getFocusedIndex();
      if (idx === -1) {
        idx = inputs.findLastIndex((inp) => inp.value !== "");
        if (idx === -1) idx = 0;
      }
      // Agar hozirgi input bo'sh bo'lsa va oldingisi bor bo'lsa — oldingisini tozalaymiz
      if (inputs[idx].value === "" && idx > 0) {
        inputs[idx - 1].value = "";
        inputs[idx - 1].focus();
      } else {
        // Aks holda — fokusdagi yoki topilgan inputni tozalaymiz
        inputs[idx].value = "";
        inputs[idx].focus();
      }
    });
  }
  // Submit and confirm to next page:
  const confirmDesktop = document.querySelector("#submit-desktop"),
    confirmMobile = document.querySelector("#submit-mobile");
  // mainRow = document.querySelector(".main__row");
  // mainRow.classList.add(".flex__column");
  const confirmingCode = (btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const allFilled = inputs.every((i) => i.value.trim() !== "");
      if (allFilled) {
        window.location.href = "./main.html";
      } else {
        if (window.innerWidth >= 768.1) {
          alert(`Please, insert full code!`);
        } else {
          const alertMsg = document.querySelector(".alert__danger");
          alertMsg.classList.remove("hide");
          alertMsg.classList.add("show");
          setTimeout(function () {
            alertMsg.classList.remove("show");
            alertMsg.classList.add("hide");
          }, 3000);
        }
      }
    });
  };
  if (window.innerWidth < 768) {
    confirmingCode(confirmMobile);
    confirmDesktop.classList.add("hide");
    confirmMobile.classList.remove("hide");
    confirmMobile.classList.add("show");
    const allFilled = inputs.every((i) => i.value.trim() !== "");
    if (allFilled) {
      window.location.href = "./main.html";
    } else {
      console.log("yban");
    }
  } else {
    confirmingCode(confirmDesktop);
    confirmDesktop.classList.add("show");
    confirmDesktop.classList.remove("hide");
  }
  clearBtn.addEventListener("click", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  });
});
