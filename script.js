// Liste des joueurs
let players = [];

// Fonction pour ajouter un joueur
function addPlayer() {
  const playerNameInput = document.getElementById("playerNameInput");
  const playerName = playerNameInput.value.trim();

  if (playerName === "") {
    alert("Please enter a player name.");
    return;
  }

  if (players.length >= 12) {
    alert("Maximum of 12 players allowed.");
    return;
  }

  players.push(playerName);
  playerNameInput.value = "";
  updatePlayerList();
}

// Fonction pour mettre à jour la liste des joueurs
function updatePlayerList() {
  const playerList = document.getElementById("playerList");
  playerList.innerHTML = "";

  players.forEach((player, index) => {
    const playerDiv = document.createElement("div");
    playerDiv.textContent = `${index + 1}. ${player}`;
    playerList.appendChild(playerDiv);
  });
}

// Fonction pour attribuer les rôles
function assignRoles() {
  if (players.length < 4) {
    alert("You need at least 4 players to start.");
    return;
  }

  if (players.length % 2 !== 0) {
    alert("The number of players must be even.");
    return;
  }

  const numHackers = players.length / 2;
  const numDefenders = players.length / 2;

  // Créer les rôles
  const roles = [];
  for (let i = 0; i < numHackers; i++) roles.push("Hacker");
  for (let i = 0; i < numDefenders; i++) roles.push("Defender");

  // Mélanger les rôles
  shuffleArray(roles);

  // Attribuer les rôles aux joueurs
  const assignedRolesList = document.getElementById("assignedRolesList");
  assignedRolesList.innerHTML = "";

  players.forEach((player, index) => {
    const playerRoleDiv = document.createElement("div");
    playerRoleDiv.className = `role ${roles[index].toLowerCase()}`;
    playerRoleDiv.textContent = `${player}: ${roles[index]}`;
    assignedRolesList.appendChild(playerRoleDiv);
  });

  // Désactiver le bouton une fois les rôles attribués
  document.getElementById("assignRolesButton").disabled = true;
}

// Fonction utilitaire pour mélanger un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Fonction pour réinitialiser la partie
function resetGame() {
  players = [];
  updatePlayerList();
  document.getElementById("assignedRolesList").innerHTML = "";
  document.getElementById("assignRolesButton").disabled = false;
}
