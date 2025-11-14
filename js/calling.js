window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container"),
    callingWindow = document.querySelector(".calling__window"),
    startCallingBtn = document.querySelector(".start__calling"),
    hangOffBtn = document.querySelector("#hang__off");
  let callingAudio = new Audio("/music/calling_soundEffect.mp3");
  let busy = new Audio("/music/busy_sound.mp3");
  function startCalling() {
    container.classList.add("hide");
    callingWindow.classList.remove("hide");
    callingWindow.classList.add("show__window");
    playCallingSound();
    callingAudio.addEventListener("ended", () => {
      playBusySound();
      busy.addEventListener("ended", () => {
        callingWindow.classList.add("hide");
        callingWindow.classList.remove("show__window");
        container.classList.remove("hide");
        playHangUpSound();
      });
    });
  }
  function playCallingSound() {
    callingAudio = new Audio("/music/calling_soundEffect.mp3");
    callingAudio.src = "/music/calling_soundEffect.mp3";
    callingAudio.volume = 0.3;
    callingAudio.style.zIndex = "-1";
    callingAudio.play();
    callingWindow.append(callingAudio);
  }
  function playBusySound() {
    busy = new Audio("/music/busy_sound.mp3");
    busy.volume = 0.4;
    busy.play();
    callingWindow.append(busy);
  }
  function playHangUpSound() {
    const endCallSound = new Audio("/music/11-hang-up-phone.mp3");
    endCallSound.currentTime = 0; // new for me
    endCallSound.play();
    endCallSound.volume = 0.3;
  }
  startCallingBtn.addEventListener("click", () => {
    startCalling();
  });
  hangOffBtn.addEventListener("click", () => {
    container.classList.remove("hide");
    callingWindow.classList.add("hide");
    callingWindow.classList.remove("show__window");
    callingAudio.pause();
    playHangUpSound();
  });
});
// tuyt tyt tyt
