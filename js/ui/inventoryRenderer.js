import { gameState } from "../core/state.js";
import { ITEMS } from "../data/items.js";

function renderInventory(inventory) {
    let html = '';
    for (const [key, qty] of Object.entries(inventory)) {
        if (qty > 0 && ITEMS[key]) {
            html += `
                <div class="inventory-item">
                    <img src="assets/images/items/${key}.png" alt="${ITEMS[key].name}">
                    <span>${qty}</span>
                    <div class="tooltip">
                        <span class="tooltip-title">${ITEMS[key].name}</span><br>
                        ${ITEMS[key].description}
                        ${ITEMS[key].compatibility && Object.keys(ITEMS[key].compatibility).length ? 
                            `<br>${Object.entries(ITEMS[key].compatibility).map(([compatKey, compatValue]) => `${compatKey}: ${compatValue}`).join('<br>')}` : ''}<br>
                        Cost: $${ITEMS[key].cost} | Sell: $${ITEMS[key].sellValue}</div>
                </div>
            `;
        }
    }
    return html || '<p>No items in this inventory.</p>';
}

export function getShopInventory() {
    return renderInventory(gameState.shopInventory);
}

export function getPersonalInventory() {
    return renderInventory(gameState.personalInventory);
}
