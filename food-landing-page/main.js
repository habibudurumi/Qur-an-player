/** @format */

const container = document.querySelector(".container");
const playBtn = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");

const chapters = [
  "087",
  "088",
  "089",
  "090",
  "091",
  "092",
  "093",
  "094",
  "095",
  "096",
  "097",
  "098",
  "099",
  "100",
  "101",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108",
  "109",
  "110",
  "111",
  "112",
  "113",
  "114",
];

let chapterIndex = 0;

loadChapter(chapters[chapterIndex]);

function loadChapter(chapter) {
  title.textContent = `Qur'an Chapter ${chapter}`;
  audio.src = `Quran/${chapter}.mp3`;
}

function playRecitation() {
  container.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
  document.querySelector("h1").style.color = "#080";
}

function pauseRecitation() {
  container.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
  document.querySelector("h1").style.color = "#fff";
}

function prevChapter() {
  chapterIndex--;
  if (chapterIndex < 0) {
    chapterIndex = chapters.length - 1;
  }

  loadChapter(chapters[chapterIndex]);
  playRecitation();
}

function nextChapter() {
  chapterIndex++;
  if (chapterIndex > chapters.length - 1) {
    chapterIndex = 0;
  }

  loadChapter(chapters[chapterIndex]);

  playRecitation();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => {
  if (container.classList.contains("play")) {
    pauseRecitation();
  } else {
    playRecitation();
  }
});

prev.addEventListener("click", prevChapter);
next.addEventListener("click", nextChapter);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextChapter);
