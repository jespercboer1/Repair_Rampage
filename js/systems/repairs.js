import { gameState } from "../core/state.js";
import { advanceTurn } from "../core/turnManager.js";

export function repairCar() {
  gameState.money += 120;
  gameState.shop.reputation += 1;

  advanceTurn();
}

export function buyParts() {
  gameState.money -= 100;
  // TODO: Add parts to inventory or something
  advanceTurn();
}