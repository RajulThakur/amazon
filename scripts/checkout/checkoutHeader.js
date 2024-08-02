import { itemsInCart } from "../../data/cart.js";

export default function renderCheckoutHeader() {
  const totalItemsEle = document.querySelector(".js-return-to-home-link");
  totalItemsEle.innerHTML = `${itemsInCart()} items`;
}