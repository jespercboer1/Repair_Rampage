import { gameState } from "../core/state.js";

export function processEmployees() {
  gameState.money += gameState.employees.length * 50;
}
