  // Types
  export type City = { 
    name: string;
    id: string;
    lat: number;
    lon: number;
  } | undefined;


  export type RouteParam = {
    city: string;
  }

  export type WeatherData = {
    time: string [];
    weather_code: number [];
    temperature_2m_max: number [];
    temperature_2m_min: number [];
    precipitation_sum: number [];
  }

  export type WeatherUI = { 
    label: string;
    icon: string;
  }

  export type HourlyForecast = { 
    time: string [];
    temperature_2m: number [];
    weather_code: number [];
  }
