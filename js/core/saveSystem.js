import { gameState } from "./state.js";
import { emit } from "./eventBus.js";
import { SCENES } from "../data/scenes.js";

const SAVE_SLOTS = [1, 2, 3];

let saveClickHandler = null;

function parseSave(raw) {
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadSlot(slot) {
  return parseSave(localStorage.getItem(`save_${slot}`));
}

function getPlayableState(data) {
  if (!data || data.day === undefined || !data.time || data.money === undefined) {
    return null;
  }

  return {
    day: data.day,
    time: data.time,
    money: data.money,
    debt: data.debt,
    stamina: data.stamina,
    shop: data.shop,
    employees: data.employees,
    shopInventory: data.shopInventory,
    personalInventory: data.personalInventory,
    currentScene: data.currentScene,
    flags: data.flags
  };
}

export function renderSaveContent() {
  return `
    <p>Save your current progress. Your game will be saved in your browser's local storage, allowing you to continue where you left off even after closing the game.</p>

    <div class="save_container">
      ${SAVE_SLOTS.map(i => {
        const rawData = loadSlot(i);
        const data = getPlayableState(rawData);

        return `
          <div class="save_file">
            <p><strong>${i}</strong></p>

            <button class="save-btn" data-slot="${i}">Save Game</button>
            <button class="load-btn" data-slot="${i}">Load Game</button>

            <p><strong>${rawData?.name || "Empty Slot"}</strong></p>

            <div class="save_info">
              ${
                data
                  ? `
                <p>
                  $${data.money}
                  | Day ${data.day}
                  | ${data.time.hour.toString().padStart(2, "0")}:${data.time.minute.toString().padStart(2, "0")}
                  | ${SCENES[data.currentScene]?.location || "Unknown Location"}
                </p>
                <p>
                  Saved on: ${rawData.savedAt ? new Date(rawData.savedAt).toLocaleString() : "Unknown"}
                </p>
              `
                  : ``
              }
            </div>

            <button class="delete-btn" data-slot="${i}">Delete Save</button>
          </div>
        `;
      }).join("")}
    </div>

    <p><em>Note: Saving will overwrite the existing save file.</em></p>
    <button class="clear_saves_btn">Clear All Saves</button>
  `;
}

export function setupSaveButtons() {
  const container = document.getElementById("menu_overlay_content");
  if (!container) return;

  if (saveClickHandler) {
    container.removeEventListener("click", saveClickHandler);
  }

  saveClickHandler = (e) => {
    if (e.target.classList.contains("clear_saves_btn")) {
      clearAllSaves();
      return;
    }

    const slot = e.target.dataset.slot;
    if (!slot) return;

    if (e.target.classList.contains("save-btn")) {
      saveGame(slot);
    }

    if (e.target.classList.contains("load-btn")) {
      loadGame(slot);
    }

    if (e.target.classList.contains("delete-btn")) {
      deleteGame(slot);
    }
  };

  container.addEventListener("click", saveClickHandler);
}

function saveGame(slot) {
  const existing = loadSlot(slot);
  const isEmpty = !existing;

  let name;

  if (isEmpty) {
    name = prompt("Enter a name for this save file:");
    if (name === null) return;

    name = name.trim() || `Save ${slot}`;
  } else {
    const input = prompt(
      `Overwrite save "${existing.name || `Save ${slot}`}"?\n\n` +
      `Enter a new name or press OK to keep it:`,
      existing.name || `Save ${slot}`
    );

    if (input === null) return;

    name = input.trim() || existing.name || `Save ${slot}`;
  }

  const saveData = {
    ...gameState,
    name,
    savedAt: new Date().toISOString()
  };

  localStorage.setItem(`save_${slot}`, JSON.stringify(saveData));
  refreshUI();
}

function loadGame(slot) {
  const data = getPlayableState(loadSlot(slot));
  if (!data) return false;

  Object.assign(gameState, data);
  emit("STATE_CHANGED");
  return true;
}

function deleteGame(slot) {
  localStorage.removeItem(`save_${slot}`);
  setTimeout(refreshUI, 0);
}

function clearAllSaves() {
  if (confirm("Are you sure you want to delete ALL save files? This action cannot be undone.")) {
    for (const slot of SAVE_SLOTS) {
      localStorage.removeItem(`save_${slot}`);
    }
    setTimeout(refreshUI, 0);
  }
}

function refreshUI() {
  const container = document.getElementById("menu_overlay_content");
  if (!container) return;

  container.innerHTML = renderSaveContent();
  setupSaveButtons();
}
