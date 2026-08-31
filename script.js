const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes a person perfect in typing.",
  "JavaScript is fun to learn and use.",
  "Never give up on your dreams and goals."
];

const display = document.getElementById("text-display");
const input = document.getElementById("text-input");
const result = document.getElementById("result");

let text = "", startTime, timer, started = false;

function startTest() {
  clearInterval(timer);

  text = texts[Math.floor(Math.random() * texts.length)];
  display.innerHTML = [...text]
    .map(c => `<span>${c}</span>`).join("");

  input.value = "";
  input.disabled = false;
  started = false;

  wpm.textContent = "0";
  accuracy.textContent = "100%";
  time.textContent = "0s";
  errors.textContent = "0";
  result.classList.remove("show");

  input.focus();
}

input.addEventListener("input", () => {

  if (!started) {
    started = true;
    startTime = Date.now();

    timer = setInterval(() => {
      const sec = Math.floor((Date.now() - startTime) / 1000);
      time.textContent = sec + "s";
      if (sec >= 60) finishTest();
    }, 1000);
  }

  const typed = input.value;
  let correct = 0, wrong = 0;

  display.querySelectorAll("span").forEach((span, i) => {
    span.className = "";

    if (typed[i]) {
      if (typed[i] === text[i]) {
        span.className = "correct";
        correct++;
      } else {
        span.className = "incorrect";
        wrong++;
      }
    }
  });

  const sec = Math.max((Date.now() - startTime) / 1000, 1);
  const acc = typed.length
    ? Math.round(correct / typed.length * 100)
    : 100;

  wpm.textContent = Math.round(correct / 5 / (sec / 60));
  accuracy.textContent = acc + "%";
  errors.textContent = wrong;

  if (typed.length >= text.length) finishTest();
});

function finishTest() {
  clearInterval(timer);
  input.disabled = true;
  started = false;

  document.getElementById("final-wpm").textContent = wpm.textContent;
  document.getElementById("final-accuracy").textContent = accuracy.textContent;
  document.getElementById("final-time").textContent = time.textContent;

  result.classList.add("show");
}

document.getElementById("restart-btn").onclick = startTest;
document.getElementById("again-btn").onclick = startTest;

startTest();