import { helpContent } from "../../data/helpContent.js";

export function setupOverlay() {
    setupMenuButtons();
}

function setupMenuButtons() {
  document.getElementById("help_menu").onclick = () => {
    const overlay = document.getElementById("menu_overlay");
    overlay.style.display = "flex";
    setTimeout(() => overlay.style.opacity = "1", 0);

    document.getElementById("menu_overlay_title").innerHTML = "Help!";
    document.getElementById("menu_overlay_content").innerHTML = helpContent;
  };

  document.getElementById("save_game").onclick = () => {
    const overlay = document.getElementById("menu_overlay");
    overlay.style.display = "flex";
    setTimeout(() => overlay.style.opacity = "1", 0);

    document.getElementById("menu_overlay_title").innerHTML = "Save Game";
    document.getElementById("menu_overlay_content").innerHTML = `
      <p>Game saving is not implemented yet. Please check back in a future update!</p>
    `;
  };

  document.getElementById("settings_menu").onclick = () => {
    const overlay = document.getElementById("menu_overlay");
    overlay.style.display = "flex";
    setTimeout(() => overlay.style.opacity = "1", 0);

    document.getElementById("menu_overlay_title").innerHTML = "Settings";
    document.getElementById("menu_overlay_content").innerHTML = `
      <p>Settings are not implemented yet. Please check back in a future update!</p>
    `;
  };

  document.getElementById("close_menu_overlay").onclick = () => {
    const overlay = document.getElementById("menu_overlay");
    overlay.style.opacity = "0";
    setTimeout(() => { overlay.style.display = "none"; }, 200);
  };
}