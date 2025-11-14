window.addEventListener("DOMContentLoaded", () => {
  const profileSection = document.querySelector(".profile-section"),
    // chat section
    chatSection = document.querySelector(".all__msgs"),
    // /chat section
    backBtn = document.querySelector("#back-chat"),
    getProfileBtn = document.querySelectorAll(".profile"),
    getMessage = document.querySelector("#get-message"),
    getFollow = document.querySelector("#get-follow"),
    getLike = document.querySelector("#like-btn"),
    profileImg = document.querySelector("#profile-image"),
    chatProfileImg = document.querySelector("#chat-profile__img"),
    menuProfile = document.querySelector("#menu-profile"),
    blockedStatus = document.querySelector(".blocked");
  function getChat() {
    profileSection.classList.remove("d-flex");
    profileSection.classList.add("hide");
    chatSection.classList.add("show");
    chatSection.classList.remove("hide");
  }
  const menu = document.createElement("div");
  backBtn.addEventListener("click", () => {
    getChat();
    menu.classList.add("hide");
  });
  menuProfile.addEventListener("click", () => {
    let current = "";

    // ✅ Agar foydalanuvchi hali block qilinmagan bo‘lsa:
    if (blockedStatus.classList.contains("hide")) {
      current = `<p class="block-user text-danger">Block</p>`;
    } else if (!blockedStatus.classList.contains("hide")) {
      current = `<p class="unblock-user text-success">UnBlock</p>`;
    }

    menu.className = "menu";
    menu.innerHTML = `
      ${current}
      <p class="deleting">Delete</p>

    `;
    if (!profileSection.contains(menu)) {
      profileSection.append(menu);
    }
  });
  // delegation for menu
  profileSection.addEventListener("click", (event) => {
    if (event.target.classList.contains("block-user")) {
      event.stopPropagation(); // 👉 boshqa click eventlarga o'tmasin
      menu.classList.add("hide");
      profileImg.src = "/img/ban-user.png";
      chatProfileImg.src = "/img/ban-user.png";
      blockedStatus.classList.remove("hide");
    }
    if (event.target.classList.contains("unblock-user")) {
      event.stopPropagation(); // 👉 boshqa click eventlarga o'tmasin
      menu.classList.add("hide");
      profileImg.src = "/img/notif_img.jpg";
      chatProfileImg.src = "/img/notif_img.jpg";
      blockedStatus.classList.add("hide");
    }
    const messageBox = document.querySelector(".message__box");
    const emptyStatus = document.createElement("div");
    messageBox.append(emptyStatus);
    const alertDeleting = document.createElement("div");
    alertDeleting.role = "alert";
    messageBox.append(alertDeleting);
    if (event.target.classList.contains("deleting")) {
      event.stopPropagation(); // 👉 boshqa click eventlarga o'tmasin
      chatSection.remove();
      profileSection.remove();
      emptyStatus.classList.add("show");
      emptyStatus.innerHTML = `
        <h3 class="text-center mt-5 text-primary">Box is empty. Select friend to make conversation.</h3>
        <p class="text-dark text-center">Xabarim created in Sept 6, 2025</p>
      `;
      alertDeleting.innerHTML = ` 
        <strong>Chat deleted</strong> Chat history never backup after deleting
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      alertDeleting.classList.add(
        "alert",
        "alert-danger",
        "alert-dismissible",
        "fade",
        "z-2",
        "position-absolute",
        "show"
      );
      alertDeleting.style.bottom = "20px";
      messageBox.classList.add("position-relative");
      setTimeout(() => {
        alertDeleting.remove();
      }, 2000);
    }
  });
  if (profileImg.src === "/img/ban-user.png") {
    profileImg.src = "/img/notif_img.jpg";
    chatProfileImg.src = "/img/notif_img.jpg";
  }
  // for chat section
  getProfileBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      chatSection.classList.remove("show");
      chatSection.classList.add("hide");
      profileSection.classList.add("d-flex");
      profileSection.classList.remove("hide");
    });
  });
  // /for chat section
  profileImg.addEventListener("click", (event) => {
    event.stopPropagation(); // <-- muhim!
    profileImg.classList.remove("profile-section__img");
    profileImg.classList.add("profile__img-overlay");
    backBtn.classList.add("hide");
    menuProfile.classList.add("hide");
  });
  profileSection.addEventListener("click", () => {
    if (profileImg.classList.contains("profile__img-overlay")) {
      profileImg.classList.remove("profile__img-overlay");
      profileImg.classList.add("profile-section__img");
      backBtn.classList.remove("hide");
      menuProfile.classList.remove("hide");
    } else {
      console.log("nothing is evented");
    }
  });
  getMessage.addEventListener("click", () => {
    getChat();
    menu.classList.add("hide");
  });
  getFollow.addEventListener("click", () => {
    const followStatus = getFollow.textContent.trim();
    if (followStatus === "Follow") {
      getFollow.textContent = "Unfollow";
      getFollow.classList.remove("follow");
      getFollow.classList.add("following");
    } else {
      getFollow.textContent = "Follow";
      getFollow.classList.remove("following");
      getFollow.classList.add("follow");
    }
  });
  getLike.addEventListener("click", () => {
    const likeStatus = getLike.textContent.trim();
    if (likeStatus === "Like ❤️") {
      getLike.textContent = "Liked 💕";
    } else {
      getLike.textContent = "Like ❤️";
    }
  });
});
