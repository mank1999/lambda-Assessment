import { WeatherResponse } from "./handler";
import { getCache, setCache } from "./cache";
import axios from "axios";

const API_KEY = "Key1234";
const CACHE_TTL = 60 * 100;
export const fetchwaether = async (city: string): Promise<WeatherResponse> => {
  const cacheKey = city.toLowerCase();
  const cached = getCache(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&amp;appid=${API_KEY}`
    );
    const tempCelsius = response.data.temp - 273.15;
    const result: WeatherResponse = {
      city: response.data.name,
      tempreture: Number(tempCelsius.toFixed(2)),
      condition: response.data.condition,
    };

    setCache(cacheKey, result, CACHE_TTL);
    return result;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("City not found");
      }

      if (error.response.status === 429) {
        throw new Error("Rate limit exceeded");
      }
    }

    throw new Error("something wents wrong");
  }
};
