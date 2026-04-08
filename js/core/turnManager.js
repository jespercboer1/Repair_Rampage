import { gameState } from "./state.js";
import { runTurnSystems } from "../systems/turnSystems.js";
import { emit } from "./eventBus.js";

export function advanceTurn() {
  gameState.day++;

  runTurnSystems();

  emit("STATE_CHANGED");
}