import { processDebt } from "./debt.js";
import { processEmployees } from "./employees.js";

export function runTurnSystems() {
  processDebt();
  processEmployees();
}