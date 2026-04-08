import { getCurrentScene } from "../core/sceneManager.js";
import { gameState } from "../core/state.js";

export function render() {
  const scene = getCurrentScene();

  const optionsHTML = scene.options
    .filter(opt => !opt.condition || opt.condition(gameState))
    .map((opt, i) =>
      `<button data-index="${i}">${opt.text}</button>`
    )
    .join("<br>");

  document.getElementById("game").innerHTML = `
    <h2>${scene.title}</h2>
    <p>${scene.text}</p>
    ${optionsHTML}
  `;

  document.getElementById("stats").innerHTML = `
    <p>Day ${gameState.day}</p>
    <p>Time: ${gameState.time.hour.toString().padStart(2, "0")}:${gameState.time.minute.toString().padStart(2, "0")}</p>
    <p>${scene.location}</p>
    <p><span class="stat_label">Money:</span> $${gameState.money.toFixed(2)}</p>
    <p><span class="stat_label">Stamina:</span> ${gameState.stamina}</p>
    <p><span class="stat_label">Level:</span> ${gameState.shop.level}</p>
    <p><span class="stat_label">Reputation:</span> ${gameState.shop.reputation}</p>
    <p><span class="stat_label">Debt:</span> $${gameState.debt.toFixed(2)}</p>
  `;
}