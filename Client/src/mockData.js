const itemTypes = [
  {
    id: 1,
    name: "טלוויזיות",
  },
  {
    id: 2,
    name: "מזגנים",
  },
  {
    id: 3,
    name: "מקררים",
  },
];

const items = [
  {
    id: 1,
    name: "Samsung 4K 55'",
    description: "אחלה טלוויזיה",
    image:
      "https://www.payngo.co.il/media/catalog/product/cache/142fd3372bf734bc9f90e710566b5dac/a/u/au7100_4.jpg",
    price: 999,
    type: 1,
    itemType: {
      id: 1,
      name: "טלוויזיות",
    },
  },
  {
    id: 1,
    name: "Tornado Inverter",
    description: "אחלה מזגן",
    image: "https://www.tornado-top.co.il/download/catalog/Series/31.png",
    price: 599,
    type: 2,
    itemType: {
      id: 2,
      name: "מזגנים",
    },
  },
];

export { itemTypes, items };
