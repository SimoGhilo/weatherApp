import type {City} from "./types";

const ukCitiesData: City[] = [
  // --- ENGLAND ---
  { name: "London", id: "london", lat: 51.5074, lon: -0.1278 },
  { name: "Birmingham", id: "birmingham", lat: 52.4862, lon: -1.8904 },
  { name: "Manchester", id: "manchester", lat: 53.4808, lon: -2.2426 },
  { name: "Liverpool", id: "liverpool", lat: 53.4084, lon: -2.9916 },
  { name: "Leeds", id: "leeds", lat: 53.8008, lon: -1.5491 },
  { name: "Newcastle", id: "newcastle", lat: 54.9783, lon: -1.6178 },
  { name: "Sheffield", id: "sheffield", lat: 53.3811, lon: -1.4701 },
  { name: "Bristol", id: "bristol", lat: 51.4545, lon: -2.5879 },
  { name: "Nottingham", id: "nottingham", lat: 52.9548, lon: -1.1581 },
  { name: "Leicester", id: "leicester", lat: 52.6369, lon: -1.1398 },
  { name: "Southampton", id: "southampton", lat: 50.9097, lon: -1.4044 },
  { name: "Plymouth", id: "plymouth", lat: 50.3755, lon: -4.1427 },
  { name: "Norwich", id: "norwich", lat: 52.6309, lon: 1.2974 },
  { name: "Brighton", id: "brighton", lat: 50.8225, lon: -0.1372 },
  { name: "Oxford", id: "oxford", lat: 51.7520, lon: -1.2577 },
  { name: "Cambridge", id: "cambridge", lat: 52.2053, lon: 0.1218 },
  { name: "Hull", id: "hull", lat: 53.7443, lon: -0.3325 },

  // --- SCOTLAND ---
  { name: "Glasgow", id: "glasgow", lat: 55.8642, lon: -4.2518 },
  { name: "Edinburgh", id: "edinburgh", lat: 55.9533, lon: -3.1883 },
  { name: "Aberdeen", id: "aberdeen", lat: 57.1497, lon: -2.0943 },
  { name: "Inverness", id: "inverness", lat: 57.4778, lon: -4.2247 },

  // --- WALES ---
  { name: "Cardiff", id: "cardiff", lat: 51.4816, lon: -3.1791 },
  { name: "Swansea", id: "swansea", lat: 51.6214, lon: -3.9436 },

  // --- NORTHERN IRELAND ---
  { name: "Belfast", id: "belfast", lat: 54.5973, lon: -5.9301 },
  { name: "Derry", id: "derry", lat: 54.9966, lon: -7.3183 }
];

export default ukCitiesData;