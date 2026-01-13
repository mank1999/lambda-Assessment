import { fetchwaether } from "./fetchWeather";

interface Request {
  city: string;
}
interface SuccessRes {
  success?: true;
  city: string;
  tempreture: number;
  condition: string;
}

interface ErrorRes {
  success: false;
  error: string;
}

export type WeatherResponse = SuccessRes | ErrorRes;

export const handler = async (event: Request): Promise<WeatherResponse> => {
  try {
    if (!event.city) {
      return {
        success: false,
        error: "city value required",
      };
    }
    const weather = await fetchwaether(event.city);
    return {
      success: true,
      ...weather,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
