import addToLocal from "../scripts/utils/addtoLocal.js";
import getFromLocal from "../scripts/utils/getFromCart.js";

export let cart = getFromLocal("cart") || [];

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
  !isPresent && cart.push({ productId, quantity: productToAdd });
  addToLocal(cart, "cart");
}

export function itemsInCart(){
  return cart.reduce((acc,item)=>acc+item.quantity,0);
}

export function updateQuantity(id,updatedQuantity){
  cart.forEach(item=>{
    if(item.productId===id){
      item.quantity=updatedQuantity;
      return;
    }
  })
}

export function updateCartQuantity() {
  const cartQuantityEle = document.querySelector(".js-cart-quantity");
  cartQuantityEle.innerHTML = itemsInCart();
  addToLocal(cart, "cart");
}

export function removeFromCart(productId) {
  const newCart = cart.filter((item) => item.productId !== productId);
  cart = newCart;
  addToLocal(cart,'cart')
}
