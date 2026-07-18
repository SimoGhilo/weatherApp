import type { WeatherUI } from "./types";

export const weatherMap: Record<number, WeatherUI> = {
// Clear & Cloudy Sky
  0: { label: "Sunny", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤️"},
  2: { label: "Partly Cloudy", icon: "⛅"},
  3: { label: "Overcast", icon: "☁️"},

  // Fog & Visibility
  45: { label: "Foggy", icon: "🌫️"},
  48: { label: "Freezing Fog", icon: "🌫️"},

  // Drizzle
  51: { label: "Light Drizzle", icon: "🌦️"},
  53: { label: "Moderate Drizzle", icon: "🌦️"},
  55: { label: "Dense Drizzle", icon: "🌦️"},
  56: { label: "Light Freezing Drizzle", icon: "🌨️"},
  57: { label: "Dense Freezing Drizzle", icon: "🌨️"},

  // Rain
  61: { label: "Slight Rain", icon: "🌧️"},
  63: { label: "Moderate Rain", icon: "🌧️"},
  65: { label: "Heavy Rain", icon: "🌧️"},
  66: { label: "Light Freezing Rain", icon: "🌧️❄️"},
  67: { label: "Heavy Freezing Rain", icon: "🌧️❄️"},

  // Snow Fall & Grains
  71: { label: "Slight Snow", icon: "❄️"},
  73: { label: "Moderate Snow", icon: "❄️"  },
  75: { label: "Heavy Snow", icon: "❄️"},
  77: { label: "Snow Grains", icon: "🌨️"},

  // Rain & Snow Showers
  80: { label: "Slight Rain Showers", icon: "🌦️"},
  81: { label: "Moderate Rain Showers", icon: "🌧️"},
  82: { label: "Violent Rain Showers", icon: "⛈️"},
  85: { label: "Slight Snow Showers", icon: "🌨️"},
  86: { label: "Heavy Snow Showers", icon: "🌨️"},

  // Thunderstorms
  95: { label: "Thunderstorm", icon: "🌩️"},
  96: { label: "Storm with Hail", icon: "⛈️"},
  99: { label: "Heavy Storm with Hail", icon: "⛈️"}
};