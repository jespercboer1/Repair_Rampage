import { on } from "./core/eventBus.js";
import { render } from "./ui/renderer.js";
import { setupButtons } from "./ui/buttons.js";
import { setupOverlay } from "./ui/menuOverlayController.js";

// setupButtons();
setupOverlay();
render();
on("STATE_CHANGED", render);