import addToLocal from "../scripts/utils/addtoLocal.js";
import getFromLocal from "../scripts/utils/getFromCart.js";

export let cart = getFromLocal("cart") || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "3",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionId: "2",
  },
  {
    productId: "54e0eccd8f36-462b-b68a-8182611d9add",
    quantity: 2,
    deliveryOptionId: "1",
  },
];

export function addToCart(productId) {
  //geting value from select element
  const cartQuantitySelectorEle = document.querySelector(
    `#${"js-quantity-selector-" + productId}`
  );
  const productToAdd = +cartQuantitySelectorEle.value;
  let isPresent = false;

  cart.forEach((product) => {
    if (product.productId === productId) {
      isPresent = true;
      product.quantity += productToAdd;
      addToLocal(cart, "cart");
      return;
    }
  });
  !isPresent &&
    cart.push({ productId, quantity: productToAdd, deliveryOptionId: "1" });
  addToLocal(cart, "cart");
}

export function itemsInCart() {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

export function updateQuantity(id, updatedQuantity) {
  cart.forEach((item) => {
    if (item.productId === id) {
      item.quantity = updatedQuantity;
      return;
    }
  });
}

export function updateCartQuantity() {
  const cartQuantityEle = document.querySelector(".js-cart-quantity");
  cartQuantityEle.innerHTML = itemsInCart();
  addToLocal(cart, "cart");
}

export function removeFromCart(productId) {
  const newCart = cart.filter((item) => item.productId !== productId);
  cart = newCart;
  addToLocal(cart, "cart");
}
