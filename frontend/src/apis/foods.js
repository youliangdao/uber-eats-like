import axios from "axios";
import { foodsIndex } from "../urls/index";

export const fetchFoods = async(restaurantId) => {
  try {
    const res = await axios.get(foodsIndex(restaurantId));
    if (res.statusText === "OK") {
      return res.data;
    } else {
      throw new Error('no data found')
    }
  } catch (e) {
    console.error(e)
  }
}
