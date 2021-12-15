const range = document.getElementById("range");
const indicator = document.getElementById("indicator");
indicator.style.transform = `translateX(${range.valueAsNumber}px)`;
range.addEventListener("input", (e) => {
  console.log(range.valueAsNumber);
  indicator.style.transform = `translateX(${range.valueAsNumber}px)`;
});
