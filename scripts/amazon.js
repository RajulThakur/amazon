import { products } from "../data/products.js";
import { addToCart,updateCartQuantity} from "../data/cart.js";
const productGridElement = document.querySelector(".js-products-grid");

updateCartQuantity();
//generating products from js
let productGridHtml = "";
products.forEach((product) => {
  productGridHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select id=${"js-quantity-selector-" + product.id}>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart ${"js-added-to-cart-" + product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button  button-primary" data-product-id='${
            product.id
          }'>
            Add to Cart
          </button>
        </div>`;
});
productGridElement.innerHTML = productGridHtml;

let prevButtonAnim;
let prevTimeoutId;


function addedAnim(currEle) {
  //added to cart animation adding
  currEle.style.opacity = 1;
  return setTimeout(() => {
    currEle.style.opacity = 0;
  }, 2000);
}
document.querySelectorAll(".add-to-cart-button").forEach((button) =>
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const addToCartAnimEle = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    //add to cart
    addToCart(productId);
    //updating cart
    updateCartQuantity();
    //added to cart  animation remove
    if (prevTimeoutId) {
      clearTimeout(prevTimeoutId);
      prevButtonAnim.style.opacity = 0;
    }
    //added to cart animation adding
    prevTimeoutId = addedAnim(addToCartAnimEle);
    prevButtonAnim = addToCartAnimEle;
  })
);

