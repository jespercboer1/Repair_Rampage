export function saveGame() {
  localStorage.setItem("save", JSON.stringify(gameState));
}