import { englishWishes } from "../constants/englishWishes.js";

export function getRandomWish() {
  const randomIndex = Math.floor(Math.random() * englishWishes.length);
  return englishWishes[randomIndex];
}
