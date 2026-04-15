import { SCENES } from "../data/scenes.js";
import { gameState } from "../core/state.js";
import { goToScene } from "../core/sceneManager.js";
import * as systems from "../systems/actions.js";

export function handleOption(index) {
  const scene = SCENES[gameState.currentScene];
  const option = scene.options[index];

  if (option.action) {
    systems[option.action]();
  }

  if (option.goto) {
    goToScene(option.goto);
  }
}