import { removeFromCart, cart, itemsInCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import addToLocal from "./utils/addtoLocal.js";
import formatCurrency from "./utils/money.js";

renderTotalItems();
function renderTotalItems() {
  const totalItemsEle = document.querySelector(".js-return-to-home-link");
  totalItemsEle.innerHTML = `${itemsInCart()} items`;
}

function renderCheckout() {
  const orderSummaryEle = document.querySelector(".js-order-summary");
  let cartHTML = "";
  if (!cart[0]) {
    orderSummaryEle.innerHTML = "Empty Cart";
    return;
  }
  cart.forEach((cartItem) => {
    const [product] = products.filter(
      (product) => product.id === cartItem.productId
    );
    console.log(product);
    cartHTML += `<div class="cart-item-container-${product.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${product.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${
                        cartItem.quantity
                      }</span>
                    </span>
                     <input class='quantity-input js-quantity-input-${
                       cartItem.productId
                     }' type='text'/>
                    <span class='save-quantity link-primary js-save-quantity-${
                      cartItem.productId
                    }'>Save</span>
                    <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id=${
                      cartItem.productId
                    }>
                      Update
                    </span>
                    <span class="delete-quantity-link js-delete-link link-primary" data-product-id=${
                      cartItem.productId
                    }>
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${cartItem.productId}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${cartItem.productId}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${cartItem.productId}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
  });

  orderSummaryEle.innerHTML = cartHTML;
}

renderCheckout();

document.querySelectorAll(".js-delete-link").forEach((deleteEle) => {
  deleteEle.addEventListener("click", () => {
    const { productId } = deleteEle.dataset;
    removeFromCart(productId);
    document.querySelector(`.cart-item-container-${productId}`).remove();
    renderTotalItems();
  });
});

document.querySelectorAll(".update-quantity-link").forEach((updateEle) => {
  updateEle.addEventListener("click", () => {
    const { productId } = updateEle.dataset;

    const parentEle = document.querySelector(`.cart-item-container-${productId}`);
    const quantityLabelEle=document.querySelector(`.js-quantity-label-${productId}`)
    const saveEle = document.querySelector(`.js-save-quantity-${productId}`);
    const inputEle = document.querySelector(`.js-quantity-input-${productId}`);
    
    parentEle.classList.toggle("is-editing-quantity");

    function updatingQuantityValue(){
      const updateCartQuantity=+inputEle.value;
      parentEle.classList.remove("is-editing-quantity");
      if(updateCartQuantity<0 || updateCartQuantity>1000) return;
      updateQuantity(productId,updateCartQuantity);
      quantityLabelEle.innerHTML = updateCartQuantity;
      addToLocal(cart,'cart');
      renderTotalItems();
    }
    inputEle.addEventListener('keydown',(e)=>{
      if(e.key!=='Enter') return;
      updatingQuantityValue();
    });
    saveEle.addEventListener("click", updatingQuantityValue);
  })
});
