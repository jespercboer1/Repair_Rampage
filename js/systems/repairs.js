import { gameState } from "../core/state.js";
import { advanceTurn } from "../core/turnManager.js";

export function repairCar() {
  gameState.money += 120;
  gameState.shop.reputation += 1;

  advanceTurn();
}