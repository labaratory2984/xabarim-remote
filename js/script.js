window.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body"),
    // About us modal
    aboutUsBtn = document.querySelector("#about-us"),
    overlay = document.querySelector(".overlay"),
    overlayMiddle = document.querySelector(".overlay-middle"),
    aboutUs = document.querySelector(".modal-about"),
    links = document.querySelectorAll(".links__item"),
    closeBtn = document.querySelectorAll(".close-btn"),
    // Like
    likeIcon = document.querySelector("#like"),
    likedIcon = document.querySelector("#liked"),
    // Feedback modal
    feedbackIcon = document.querySelector("#feedback"),
    feedbackBox = document.querySelector(".feedback-box"),
    textArea = document.querySelector("#textarea"),
    sendBtn = document.querySelector(".send-feedback"),
    // Loader animation
    loaderIcon = document.querySelector(".loader"),
    sendBtnText = document.querySelector(".btn-text"),
    sentIcon = document.querySelector(".sent-icon"),
    // Footer case:
    subscribeBtn = document.querySelector("#subscribe-button"),
    footerEmail = document.querySelector("#footer-email");

  aboutUsBtn.addEventListener("click", () => {
    body.style.overflowY = "hidden";
    overlay.classList.add("show");
    overlay.classList.remove("hide");
    aboutUs.classList.add("show");
    aboutUs.classList.remove("hide");
  });
  closeBtn.forEach((icon) => {
    icon.addEventListener("click", () => {
      body.style.overflowY = "scroll";
      overlay.classList.add("hide");
      overlay.classList.remove("show");
      aboutUs.classList.add("hide");
      aboutUs.classList.remove("show");
      overlayMiddle.classList.add("hide");
      overlayMiddle.classList.remove("show");
      feedbackBox.classList.add("hide");
      feedbackBox.classList.remove("show");
    });
  });
  overlay.addEventListener("click", () => {
    body.style.overflowY = "scroll";
    overlay.classList.add("hide");
    overlay.classList.remove("show");
    aboutUs.classList.add("hide");
    aboutUs.classList.remove("show");
    feedbackBox.classList.add("hide");
    feedbackBox.classList.remove("show");
  });
  // Scrolling
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollY = window.scrollY;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionHeight + sectionTop) {
        links.forEach((link) => {
          link.classList.remove(
            "links__item-white",
            "links__item-black",
            "links__item-green"
          );
        });
        if (index === 0) {
          links.forEach((link) => {
            link.classList.add("links__item-black");
          });
        } else if (index === 1) {
          links.forEach((link) => {
            link.classList.add("links__item-white");
          });
        } else if (index === 2) {
          links.forEach((link) => {
            link.classList.add("links__item-green");
          });
        } else {
          links.forEach((link) => {
            link.classList.add("links__item-black");
          });
        }
      }
    });
  });
  // Like and feedback
  likeIcon.addEventListener("click", () => {
    likeIcon.classList.add("hide");
    likedIcon.classList.remove("hide");
    likedIcon.classList.add("like-icon__liked");
  });
  likedIcon.addEventListener("click", () => {
    likedIcon.classList.remove("like-icon__liked");
    likedIcon.classList.add("hide");
    likeIcon.classList.remove("hide");
    likeIcon.classList.add("show");
  });
  feedbackIcon.addEventListener("click", () => {
    body.style.overflowY = "hidden";
    overlay.classList.add("show");
    overlay.classList.remove("hide");
    feedbackBox.classList.add("show");
    feedbackBox.classList.remove("hide");
  });
  // Fetch to server
  const botToken = "8262517985:AAEICmp-flCgmWE5AaECpEE-DG1o0hoFkBI";
  const myId = "6401123819";
  const process = {
    sending: "Sending",
    success: "Sent",
    failure: "Something went wrong, try again.",
  };
  sendBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const message = textArea.value.trim();
    if (message === "") {
      alert("Iltimos, xabar yozing!");
      return;
    }
    function statusDelay(status) {
      if (status === process.sending) {
        sendBtnText.textContent = status;
        loaderIcon.classList.remove("hide");
        setTimeout(function () {
          loaderIcon.classList.add("hide");
          // sendBtnText.textContent = "Send again";
        }, 1500);
      } else if (status === process.success) {
        loaderIcon.classList.add("hide");
        sentIcon.classList.remove("hide");
        sendBtnText.textContent = status;
        sendBtnText.style.color = "white";
        setTimeout(function () {
          sentIcon.classList.add("hide");
          sendBtnText.textContent = "";
          sendBtnText.textContent = "Send again";
          sendBtnText.style.color = "black";
        }, 2000);
      } else {
        sendBtnText.textContent = failure;
        setTimeout(function () {
          sendBtnText.textContent = "";
          sendBtnText.textContent = "Send again";
        }, 2000);
      }
    }
    statusDelay(process.sending);
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: myId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "Yuborildi ✅");
        textArea.value = "";
        statusDelay(process.success);
      })
      .catch((error) => {
        console.log(error, "Yuborilmadi.");
        textArea.value = "";
        statusDelay(process.failure);
      });
  });
  // Footer email subscribe:
  const subscribeBotToken = "8036743908:AAGXz8g6hM_9BqZfgixAXiNHEVJhQDWxZZo";
  subscribeBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const messageToBot = footerEmail.value.trim();
    if (messageToBot !== "") {
      fetch(`https://api.telegram.org/bot${subscribeBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: myId,
          text: `User email: ${messageToBot}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(JSON.stringify(data, null, 2)))
        .catch((error) => console.log(` 🤦‍♂️Something went wrong: ${error}`))
        .finally(() => {
          console.log(`Don't worry about it.`);
        });
      footerEmail.value = "";
    } else {
      alert("Insert your email, please.");
    }
  });
});
