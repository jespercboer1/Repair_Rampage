export const SCENES = {
  garage: {
    title: "Your Garage",
    location: "Your Garage",
    text: "Oil stains cover the floor. Another long day begins.",

    options: [
      {
        text: "Repair a customer's car",
        action: "repairCar"
      },
      {
        text: "Go to Parts Store",
        goto: "partsStore"
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