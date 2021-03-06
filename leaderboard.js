// Elements
const leaderboardListingEl = document.getElementById("leaderboard-listing");

// Read data from localStorage to arrray
const scores = JSON.parse(localStorage.getItem("scores"));

// Sort the array by time use bubble sort
const sortScoresArray = (array, attribute) => {
  let swapped;
  do {
    swapped = false;
    for (i = 0; i < array.length - 1; i++) {
      if (array[i][attribute] < array[i + 1][attribute]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
};

// Output scores array to leaderboard
const createLeaderRow = (rank, name, time) => {
  const leaderRow = document.createElement("tr");
  const leaderRank = document.createElement("th");
  leaderRank.setAttribute("scope", "row");
  leaderRank.textContent = rank;
  const leaderName = document.createElement("td");
  leaderName.textContent = name;
  const leaderTime = document.createElement("td");
  leaderTime.textContent = time;
  leaderRow.appendChild(leaderRank);
  leaderRow.appendChild(leaderName);
  leaderRow.appendChild(leaderTime);
  leaderboardListingEl.appendChild(leaderRow);
};

const displayScores = () => {
  sortScoresArray(scores, "time");
  scores.forEach((score, i) => {
    createLeaderRow(i + 1, score.name, score.time);
  });
};

const displayEmpty = () => {
  const emptyEl = document.createElement("p");
  emptyEl.textContent = "It's looking a little empty here :(";
  const lbColEl = document.getElementById("lb-col");
  lbColEl.appendChild(emptyEl);
};

// Check if any scores exist in localStorage otherwise let user know it's empty
scores ? displayScores() : displayEmpty();

// Clear scores routine
document.getElementById("clear").addEventListener("click", () => {
  localStorage.removeItem("scores");
  location.reload();
});