import axios from "axios";
import { restaurantsIndex } from "../urls/index";

export const fetchRestaurants = async() => {
  const res = await axios.get(restaurantsIndex);
  return res.data;
}
