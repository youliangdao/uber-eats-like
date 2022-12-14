import axios from "axios";
import { restaurantsIndex } from "../urls/index";

export const fetchRestaurants = async() => {
  try {
    const res = await axios.get(restaurantsIndex);
    if (res.statusText === "OK") {
      return res.data;
    } else {
      throw new Error('no data found')
    }
  } catch (e) {
    console.error(e)
  }
}
