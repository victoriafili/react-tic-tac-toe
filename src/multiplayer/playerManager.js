const PLAYER_KEY = "tic-tac-toe-players";
const TAB_KEY = "tic-tac-toe-tab-id";

function getTabId() {
  let id = sessionStorage.getItem(TAB_KEY);

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(TAB_KEY, id);
  }

  return id;
}

export function assignPlayer() {
  const tabId = getTabId();

  const players =
    JSON.parse(localStorage.getItem(PLAYER_KEY)) || {
      X: null,
      O: null,
    };

  // If already assigned, return existing role
  if (players.X === tabId) return "X";
  if (players.O === tabId) return "O";

  // Assign X if empty
  if (!players.X) {
    players.X = tabId;
    localStorage.setItem(PLAYER_KEY, JSON.stringify(players));
    return "X";
  }

  // Assign O if empty
  if (!players.O) {
    players.O = tabId;
    localStorage.setItem(PLAYER_KEY, JSON.stringify(players));
    return "O";
  }

  return "SPECTATOR";
}