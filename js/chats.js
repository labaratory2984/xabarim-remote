window.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.querySelector(".message__box"),
    messagesCase = document.querySelector(".messages-case"),
    // profile section instruments
    getProfileBtn = document.querySelectorAll(".profile"),
    profileSection = document.querySelector(".profile-section"),
    chatSection = document.querySelector(".all__msgs"),
    getFollow = document.querySelector("#get-follow"),
    // /profile section instruments
    chatAll = document.querySelector("#all"),
    chatPrivate = document.querySelector("#private"),
    chatGroups = document.querySelector("#groups"),
    chatGeneral = document.querySelector("#general"),
    chatCommunities = document.querySelector("#communities"),
    // Direct, menu chat
    menuBtn = document.querySelector("#menu-chat"),
    closeBtn = document.querySelector(".bi-x-circle"),
    messages = document.querySelector(".messages"),
    // Message time:
    messageTime = document.querySelector(".time"),
    // Typing message
    input = document.querySelector("#input_msg"),
    sendBtn = document.querySelector("#send-button"),
    // blocking user
    chatProfileImg = document.querySelector("#chat-profile__img"),
    mainProfileImg = document.querySelector("#profile-image"),
    blockedStatus = document.querySelector(".blocked");
  // menu
  const menu = document.createElement("div");
  menuBtn.addEventListener("click", () => {
    // clearing chat
    const currentStatus = getFollow.textContent.trim();
    // ✅ chat tozalanganini `empty-message__box` orqali tekshiramiz
    const isCleared = messages.querySelector(".empty-message__box") !== null;
    // /clearing chat

    // blocking user
    let blockingStatus = "";
    // ✅ Agar foydalanuvchi hali block qilinmagan bo‘lsa:
    if (blockedStatus.classList.contains("hide")) {
      blockingStatus = `<p class="user-block text-danger">Block</p>`;
    }
    // ❌ Block qilgan bolsa
    else if (!blockedStatus.classList.contains("hide")) {
      blockingStatus = `<p class="user-unblock text-success">Unblock</p>`;
    }
    // /blocking user
    menu.className = "menu hide";
    menu.innerHTML = `
      <p class="menu-follow">${
        currentStatus === "Unfollow" ? "Unfollow" : "Follow"
      }</p>
      <p class="see-profile">See profile</p>
     ${blockingStatus}
      <p class="delete-chat">Delete</p>
 ${!isCleared ? `<p class="clear-chat">Clear chat</p>` : ""}
    `;
    // Menu faqat bir marta append qilinadi
    if (!messagesCase.contains(menu)) {
      messagesCase.append(menu);
    }
    // Menu tugmasi bosilganda
    menu.classList.toggle("hide"); // ko‘rsatish yoki yashirish
    messages.style.overflow = "hidden";
    menuBtn.classList.add("hide");
    closeBtn.classList.remove("hide");
  });

  // Delegation: see profile event:
  messagesCase.addEventListener("click", (event) => {
    if (event.target.classList.contains("see-profile")) {
      // menu closing
      menu.classList.add("hide");
      closeBtn.classList.add("hide");
      menuBtn.classList.remove("hide");
      messages.style.overflowY = "auto";
      // endi chatni yashirib, profilni ko‘rsatamiz
      chatSection.classList.remove("show");
      chatSection.classList.add("hide");
      profileSection.classList.add("d-flex");
      profileSection.classList.remove("hide");
    }

    // Delegation: follow on chat section:
    if (event.target.classList.contains("menu-follow")) {
      const followStatus = getFollow.textContent.trim();
      if (followStatus === "Follow") {
        getFollow.textContent = "Unfollow";
        event.target.textContent = "Unfollow";
        getFollow.classList.remove("follow");
        getFollow.classList.add("following");
      } else {
        getFollow.textContent = "Follow";
        event.target.textContent = "Follow";
        getFollow.classList.add("follow");
        getFollow.classList.remove("following");
      }
    }
    // Delegation for clear chat:
    const alert = document.querySelector(".alert-success");

    if (event.target.classList.contains("clear-chat")) {
      event.stopPropagation(); // 👉 boshqa click eventlarga o'tmasin
      closingMenu();
      messages.innerHTML = "";
      const emptyBox = document.createElement("div");
      emptyBox.classList.add("empty-message__box");
      emptyBox.innerHTML = `                
        <div class="empty-message__box ">
        <img
        src="/img/empty-icon.png"
        alt="empty"
        class="img-fluid"
        style="height: 150px; width: 150px"
        />
        <h3 class="text-white text-center">Chat is cleaned forever, dude.</h3>
        <p class="text-white text-center">Xabarim created in Sept 6, 2025</p>
        </div>`;

      messages.append(emptyBox);
      alert.classList.add("show");
      messagesCase.append(alert);
      setTimeout(() => {
        alert.classList.remove("show");
      }, 2500);
    }

    // Delegetion for blocking user
    if (event.target.classList.contains("user-block")) {
      closingMenu();
      // menu.classList.add("hide");
      chatProfileImg.src = "/img/ban-user.png";
      mainProfileImg.src = "/img/ban-user.png";
      blockedStatus.classList.remove("hide");
    }

    // Delegation for unblock user:
    if (event.target.classList.contains("user-unblock")) {
      closingMenu();
      chatProfileImg.src = "/img/notif_img.jpg";
      mainProfileImg.src = "/img/notif_img.jpg";
      blockedStatus.classList.add("hide");
    }

    // Delegation for deleting chat
    const emptyStatus = document.createElement("div");
    messageBox.append(emptyStatus);
    const alertDeleting = document.createElement("div");
    alertDeleting.role = "alert";
    messageBox.append(alertDeleting);

    if (event.target.classList.contains("delete-chat")) {
      chatSection.remove();
      profileSection.remove();
      emptyStatus.classList.add("show");
      emptyStatus.innerHTML = `
    <h3 class="text-center mt-5 text-primary">Box is empty. Select chat to make conversation.</h3>
    <p class="text-dark text-center">Xabarim created in Sept 6, 2025</p>
    `;

      // deleting alert
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
  }); //ssss
  // Tashqariga bosilganda menyuni yopamiz
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== menuBtn) {
      menu.classList.add("hide");
      closingMenu();
    }
  });

  // /Delegation: see profile event and follow
  getProfileBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      closingMenu();
    });
  });

  function closingMenu() {
    menu.classList.add("hide");
    closeBtn.classList.add("hide");
    menuBtn.classList.remove("hide");
    messages.style.overflowY = "auto";
    // 🔁 menyuni har safar qayta ochganda follow statusni yangilab turamiz
    const menuFollow = menu.querySelector(".menu-follow");
    if (menuFollow) {
      const followStatus = getFollow.textContent.trim();
      menuFollow.textContent = followStatus;
    }
  }

  closeBtn.addEventListener("click", () => {
    closingMenu();
  });

  messages.addEventListener("click", () => {
    closingMenu();
  });

  // date
  const messageDate = document.createElement("div");
  // /date

  messages.addEventListener("click", (event) => {
    if (event.target.classList.contains("date")) {
      messageDate.innerHTML = "";
    } else if (!event.target.classList.contains("date")) {
      messages.append(messageDate);
    }
  });
  sendBtn.addEventListener("click", () => {
    if (input.value.trim() !== "") {
      const emptyBox = document.querySelector(".empty-message__box");
      if (emptyBox) {
        emptyBox.remove();
      }
      // Sending time:
      const now = new Date();
      let year = now.getFullYear();
      console.log(year);
      let months = now.getMonth();
      let month;
      let day = now.getDate();
      console.log(day);
      switch (months) {
        case 0:
          month = "January";
          break;
        case 1:
          month = "Febrauary";
          break;
        case 2:
          month = "March";
          break;
        case 3:
          month = "April";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "June";
          break;
        case 6:
          month = "July";
          break;
        case 7:
          month = "August";
          break;
        case 8:
          month = "September";
          break;
        case 9:
          month = "October";
          console.log("October");
          break;
        case 10:
          month = "November";
          break;
        case 11:
          month = "December";
          break;
      }
      let hours = now.getHours();
      let minutes = now.getMinutes();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      messageTime.textContent = `${hours}: ${minutes}`;
      // 🔍 Oxirgi sanani tekshiramiz
      messageDate.classList.add("date");
      messageDate.textContent = `${day}-${month}, ${year}`;

      // Sana allaqachon mavjudmi, tekshiramiz
      const existingDate = Array.from(messages.querySelectorAll(".date")).find(
        (el) => el.textContent === messageDate.textContent
      );

      // Agar sana yo‘q bo‘lsa, yangisini qo‘shamiz
      if (!existingDate) {
        // yangi sana har doim eng yuqoriga chiqsin:
        messages.prepend(messageDate);
      }
      const newMessage = document.createElement("div");
      newMessage.className = "d-flex align-items-center responding__message";
      newMessage.innerHTML = `
        <div class="responding__message-pocket">
          <div>${input.value}</div>
          <span class="time">${hours}:${minutes}</span>

        </div>
        <img
        src="/img/profile.jpg"
        alt="hero"
        class="avatar"
        style="border-radius: 50%; height: 30px; width: 30px"
        />
      `;
      // ss
      messages.append(newMessage);
      messages.scrollTop = messages.scrollHeight; // new for me.
      input.value = "";
      // Audio
      const callingVolume = document.createElement("audio");
      callingVolume.src = "/music/send-effect.mp3";
      callingVolume.volume = 0.3;
      callingVolume.play();
      messages.append(callingVolume);
    } else {
      alert("You made mistake!");
    }
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
      const emptyBox = document.querySelector(".empty-message__box");
      if (emptyBox) {
        emptyBox.remove();
      }
      // Sending time:
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      messageTime.textContent = `${hours}: ${minutes}`;
      const newMessage = document.createElement("div");
      newMessage.className = "d-flex align-items-center responding__message";
      newMessage.innerHTML = `
        <div class="responding__message-pocket">       
          <div>${input.value}</div>
          <span class="time">${hours}:${minutes}</span>
        </div>
        <img
        src="/img/profile.jpg"
        alt="hero"
        class="avatar"
        style="border-radius: 50%; height: 30px; width: 30px"
        />
      `;
      messages.append(newMessage);
      messages.scrollTop = messages.scrollHeight;
      input.value = "";
      // Audio
      const sendVolume = document.createElement("audio");
      sendVolume.classList.add("send__effect");
      sendVolume.src = "/music/send-effect.mp3";
      sendVolume.volume = 0.3;
      sendVolume.play();
      messages.append(sendVolume);
    }
  });
});
