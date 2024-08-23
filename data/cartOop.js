import addToLocal from "../scripts/utils/addtoLocal.js";
import getFromLocal from "../scripts/utils/getFromCart.js";

const cart = {
  cartItem: getFromLocal("cart") || [
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
  ],
  
  addToCart: function (productId) {
    //geting value from select element
    const cartQuantitySelectorEle = document.querySelector(
      `#${"js-quantity-selector-" + productId}`
    );
    const productToAdd = +cartQuantitySelectorEle.value;
    let isPresent = false;

    this.cartItem.forEach((product) => {
      if (product.productId === productId) {
        isPresent = true;
        product.quantity += productToAdd;
        addToLocal(this.cartItem, "cart");
        return;
      }
    });
    !isPresent &&
      this.cartItem.push({
        productId,
        quantity: productToAdd,
        deliveryOptionId: "1",
      });
    addToLocal(this.cartItem, "cart");
  },
  //short hand to write methods
  
  itemsInCart() {
    return this.cartItem.reduce((acc, item) => acc + item.quantity, 0);
  },
  
  updateCartQuantity() {
    const cartQuantityEle = document.querySelector(".js-cart-quantity");
    cartQuantityEle.innerHTML = itemsInCart();
    addToLocal(this.cart, "cart");
  },
  
  updateQuantity(id, updatedQuantity) {
    this.cartItem.forEach((item) => {
      if (item.productId === id) {
        item.quantity = updatedQuantity;
        return;
      }
    });
  },
  
  removeFromCart(productId) {
    const newCart = this.cartItem.filter(
      (item) => item.productId !== productId
    );
    this.cartItem = newCart;
    addToLocal(this.cartItem, "cart");
  },
  
  updateDeliveryOption(productId, deliveryId) {
    const [matchingItem] = this.cartItem.filter(
      (item) => item.productId === productId
    );
    matchingItem.deliveryOptionId = deliveryId;
    addToLocal("cart");
  },
};