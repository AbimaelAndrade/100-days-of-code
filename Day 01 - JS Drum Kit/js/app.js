const keys = document.querySelectorAll(`.key`);

function removeTransform(event) {
  if (event.propertyName !== "transform") return;

  this.classList.remove("playing");
}

function playSound(event) {
  const keyCode =
    event.type === "click" ? this.getAttribute("data-key") : event.keyCode;

  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");
}

window.addEventListener("keydown", playSound);

keys.forEach((key) => key.addEventListener("click", playSound));

keys.forEach((key) => key.addEventListener("transitionend", removeTransform));
