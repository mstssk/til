const later = require("@breejs/later");

// https://breejs.github.io/later/parsers.html
const sched = later.parse.text("every 6 months on the first day of the month");
const occurrences = later.schedule(sched).next(5);
if (Array.isArray(occurrences)) {
  occurrences.forEach((item) => {
    console.log(item);
  });
} else {
  throw occurrences;
}
