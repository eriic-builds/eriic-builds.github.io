const actualRounds = [
  { id: "r32", label: "Round of 32", points: 1, matches: [
    ["South Africa", "Canada", 0, 1], ["Germany", "Paraguay", 1, 1], ["Netherlands", "Morocco", 1, 1], ["Brazil", "Japan", 2, 1],
    ["Ivory Coast", "Norway", 1, 2], ["France", "Sweden", 3, 0], ["Mexico", "Ecuador", 2, 0], ["England", "DR Congo", 2, 1],
    ["USA", "Bosnia & Herz.", 2, 0], ["Belgium", "Senegal", 3, 2], ["Portugal", "Croatia", 2, 1], ["Spain", "Austria", 3, 0],
    ["Argentina", "Cape Verde", 3, 2], ["Australia", "Egypt", 1, 1], ["Switzerland", "Algeria", 2, 0], ["Colombia", "Ghana", 1, 0]
  ]},
  { id: "r16", label: "Round of 16", points: 2, matches: [
    ["Canada", "Morocco", 0, 3], ["Paraguay", "France", 0, 1], ["Brazil", "Norway", 1, 2], ["Mexico", "England", 2, 3],
    ["Portugal", "Spain", 0, 1], ["USA", "Belgium", 1, 4], ["Argentina", "Egypt", 3, 2], ["Switzerland", "Colombia", 0, 0]
  ]},
  { id: "qf", label: "Quarterfinals", points: 4, matches: [
    ["France", "Morocco", 2, 0], ["Spain", "Belgium", 2, 1], ["Norway", "England", 1, 2], ["Argentina", "Switzerland", 3, 1]
  ]},
  { id: "sf", label: "Semifinals", points: 6, matches: [["France", "Spain", 2, 1], ["England", "Argentina", 0, 2]] },
  { id: "final", label: "Final", points: 8, matches: [["France", "Argentina", 2, 0]] }
];

const pickedTeams = [
  ["Canada", "Germany", "Netherlands", "Japan", "Australia", "France", "Mexico", "England", "USA", "Belgium", "Portugal", "Spain", "Argentina", "Australia", "Switzerland", "Colombia"],
  ["Canada", "France", "Japan", "England", "Portugal", "USA", "Argentina", "Colombia"],
  ["France", "Portugal", "England", "Argentina"], ["France", "England"], ["England"]
];
const wrongIndices = new Set(["r32-1", "r32-2", "r32-13", "r16-2", "r16-4", "r16-5", "qf-1", "sf-1", "final-0"]);
const countryFlags = { Canada:"🇨🇦", Germany:"🇩🇪", Paraguay:"🇵🇾", France:"🇫🇷", Morocco:"🇲🇦", Brazil:"🇧🇷", Japan:"🇯🇵", Norway:"🇳🇴", Mexico:"🇲🇽", England:"🏴", Portugal:"🇵🇹", Spain:"🇪🇸", USA:"🇺🇸", Belgium:"🇧🇪", Argentina:"🇦🇷", Egypt:"🇪🇬", Switzerland:"🇨🇭", Colombia:"🇨🇴", Australia:"🇦🇺" };
const map = document.querySelector("#bracketMap");
let currentView = "actual";
let currentFilter = "all";

function statusFor(roundId, index) { return wrongIndices.has(`${roundId}-${index}`) ? "wrong" : "correct"; }
function renderBracket() {
  map.replaceChildren();
  actualRounds.forEach((round, roundIndex) => {
    const column = document.createElement("section");
    column.className = "round-column";
    const title = document.createElement("div");
    title.className = "round-title";
    title.innerHTML = `<span>${round.label}</span><span>${round.points} pt${round.points > 1 ? "s" : ""}</span>`;
    const list = document.createElement("div");
    list.className = "match-list";
    round.matches.forEach((match, index) => {
      const status = statusFor(round.id, index);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "match-card";
      button.dataset.status = status;
      button.dataset.match = `${round.id.toUpperCase()}-${index + 1}`;
      button.hidden = currentFilter !== "all" && currentFilter !== status;
      const picked = pickedTeams[roundIndex][index];
      if (currentView === "picks") {
        button.innerHTML = `<span class="match-team winner">${countryFlags[picked] || ""} ${picked}</span><span class="match-score ${status === "wrong" ? "negative" : ""}">${status === "wrong" ? "OUT" : "✓"}</span><span class="match-team">Your selection</span><span class="match-score muted">${round.points}pt</span><span class="match-code">${round.id.toUpperCase()}-${index + 1}</span>`;
      } else {
        const [home, away, homeScore, awayScore] = match;
        const homeWins = homeScore > awayScore;
        const awayWins = awayScore > homeScore || (homeScore === awayScore && index % 2 === 0);
        button.innerHTML = `<span class="match-team ${homeWins ? "winner" : ""}">${countryFlags[home] || ""} ${home}</span><span class="match-score">${homeScore}</span><span class="match-team ${awayWins ? "winner" : ""}">${countryFlags[away] || ""} ${away}</span><span class="match-score">${awayScore}</span><span class="match-code">${round.id.toUpperCase()}-${index + 1}</span>`;
      }
      list.append(button);
    });
    column.append(title, list);
    map.append(column);
  });
}

function setPressed(groupSelector, activeButton) {
  document.querySelectorAll(groupSelector).forEach((button) => button.setAttribute("aria-pressed", String(button === activeButton)));
}
document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
  currentView = button.dataset.view;
  setPressed("[data-view]", button);
  renderBracket();
}));
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
  currentFilter = button.dataset.filter;
  setPressed("[data-filter]", button);
  renderBracket();
}));

const dialog = document.querySelector("#matchDialog");
document.addEventListener("click", (event) => {
  const match = event.target.closest("[data-match]");
  if (match) {
    document.querySelector("#dialogTitle").textContent = `Match details · ${match.dataset.match}`;
    dialog.showModal();
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "leaderboard") document.querySelector("#pool").scrollIntoView({ behavior: "smooth", block: "center" });
  if (action === "share") showToast("Private share link copied · demo");
  if (action === "backup") showToast("Pool backup prepared · demo");
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

let toastTimer;
function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
renderBracket();