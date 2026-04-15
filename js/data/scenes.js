export const SCENES = {
  garage: {
    title: "Your Garage",
    location: "Your Garage",
    text: "Oil stains cover the floor. Another long day begins.",

    options: [
      {
        text: "Repair a customer's car",
        action: "repairCar",
        // flags: { repairedFirstCar: true } 
      },
      {
        text: "Go to Parts Store",
        goto: "partsStore",
        // condition: state => state.flags.repairedFirstCar
        // flags: {flagName: value} (this is a new flag, not a condition, so it will be set when you click the option, regardless of the condition)
        // stamina: -10
        // time: 30
      }
    ]
  },

  partsStore: {
    title: "Parts Store",
    location: "Parts Store",
    text: "Shelves packed with expensive components.",

    options: [
      {
        text: "Buy cheap parts (€100)",
        action: "buyParts",
        condition: state => state.money >= 100
      },
      {
        text: "Return to garage",
        goto: "garage"
      }
    ]
  }
};