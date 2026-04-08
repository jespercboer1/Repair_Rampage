import { gameState } from "../core/state.js";

export function processDebt() {
  gameState.debt *= 1.01; // interest
}