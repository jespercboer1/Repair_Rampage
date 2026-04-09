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
    <p><span class="stat_label">Day ${gameState.day}</span></p>
    <p><span class="stat_label">${gameState.time.hour.toString().padStart(2, "0")}:${gameState.time.minute.toString().padStart(2, "0")}</span></p>
    <p><span class="stat_label orange">${scene.location}</span></p>
    <div class="devider"></div>
    <p><span class="stat_label green">Money:</span> $${gameState.money.toFixed(2)}</p>
    <p><span class="stat_label blue">Stamina:</span> ${gameState.stamina}</p>
    <p><span class="stat_label blue">Reputation:</span> ${gameState.shop.reputation}</p>
    <p><span class="stat_label red">Debt:</span> $${gameState.debt.toFixed(2)}</p>
  `;

  document.getElementById("menu_overlay").style.display = "none";
}