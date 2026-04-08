import { on } from "./core/eventBus.js";
import { render } from "./ui/renderer.js";
import { setupButtons } from "./ui/buttons.js";

// setupButtons();
render();
on("STATE_CHANGED", render);