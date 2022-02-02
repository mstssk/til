const loopCount = 100000;

document.addEventListener("DOMContentLoaded", () => {
  console.log(`Loop ${loopCount} times.`);
  {
    const start = new Date();
    instantinateOnce();
    console.log(
      instantinateOnce.name,
      (new Date().getTime() - start.getTime()) / 1000
    );
  }
  {
    const start = new Date();
    instantinateEverytime();
    console.log(
      instantinateEverytime.name,
      (new Date().getTime() - start.getTime()) / 1000
    );
  }
});

function instantinateEverytime() {
  const date = new Date();
  for (let index = 0; index < loopCount; index++) {
    Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }
}

function instantinateOnce() {
  const formatter = Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = new Date();
  for (let index = 0; index < loopCount; index++) {
    formatter.format(date);
  }
}
