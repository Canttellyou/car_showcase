import { CarProps, FilterProps } from "@/types";
import axios from "axios";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, fuel, limit, model, year } = filters;
  const headers = {
    "X-RapidAPI-Key": "d76e530e14msh99293d0de8a297cp1904e9jsn553eff0a2fcc",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

// export const generateCarImageUrl = async (car: CarProps, angle?: string) => {
//   let url = new URL("http://api.carmd.com/v3.0/engine");
//   const { make, model, year } = car;
//   const headers = new Headers();

//   url.searchParams.append("year", `${year}`);
//   url.searchParams.append("make", make.toUpperCase());
//   url.searchParams.append("model", model.split(" ")[0].toUpperCase());

//   // url.searchParams.append('zoomLevel', zoomLevel);
//   // url.searchParams.append("angle", `${angle}`);

//   const response = await axios.get(url.href, {
//     headers: {
//       authorization: `Basic ${process.env.NEXT_PUBLIC_AUTH_KEY}`,
//       "partner-token": process.env.NEXT_PUBLIC_PARTNER_TOKEN,
//     },
//   });
//   const { data }: { data: string[] } = response.data;
//   console.log(data);

//   if (Array.isArray(data) && data.length === 0) {
//     return null;
//   } else {
//     const imageURL = new URL("http://api.carmd.com/v3.0/image");
//     imageURL.searchParams.append("year", `2015`);
//     imageURL.searchParams.append("make", make.toUpperCase());
//     imageURL.searchParams.append("model", model.split(" ")[0].toUpperCase());
//     imageURL.searchParams.append("engine", data[0]);

//     const imageResponse = await axios.get(imageURL.href, {
//       headers: {
//         authorization: `Basic ${process.env.NEXT_PUBLIC_AUTH_KEY}`,
//         "partner-token": process.env.NEXT_PUBLIC_PARTNER_TOKEN,
//       },
//     });
//     console.log(imageResponse);
//   }
//   return `${url}`;
// };

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
