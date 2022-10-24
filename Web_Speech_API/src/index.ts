document.addEventListener(
  "DOMContentLoaded",
  () => {
    document
      .querySelector("#button")
      ?.addEventListener("click", recognizeSpeech);
  },
  { once: true }
);

function recognizeSpeech() {
  const SpeechRecognition =
    window.SpeechRecognition ?? window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("This browser does not support Web Speech API.");
    return;
  }
  const outputElem = document.querySelector("#output");
  const statElem = document.querySelector("#stat");

  const recognition = new SpeechRecognition();
  recognition.lang = "ja-JP";
  recognition.continuous = false;
  recognition.interimResults = false;
  // recognition.maxAlternatives = 1;
  recognition.addEventListener("result", (event) => {
    console.log(event);
    outputElem!.textContent += event.results[0][0].transcript + "\n";
  });
  recognition.addEventListener("start", () => {
    statElem!.textContent = "Recognizing...";
  });
  recognition.addEventListener("end", () => {
    statElem!.textContent = "";
  });
  recognition.start();
}
