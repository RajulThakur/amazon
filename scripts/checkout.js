import {
  removeFromCart,
  cart,
  itemsInCart,
  updateQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { deliveryOption } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import addToLocal from "./utils/addtoLocal.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

renderTotalItems();
renderCheckout();
const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("D MMMM, dddd"));
console.log(today.format());

function renderTotalItems() {
  const totalItemsEle = document.querySelector(".js-return-to-home-link");
  totalItemsEle.innerHTML = `${itemsInCart()} items`;
}

function dateFormated(day = 0) {
  return dayjs().add(day, "day").format("D MMM, dddd");
}

function renderDateSelector(cartItem) {
  let genHTML = "";
  deliveryOption.forEach((option, i) => {
    genHTML += `
                  
                  <div class="delivery-option js-delivery-option" data-product-id=${
                    cartItem.productId
                  } data-delivery-option-id=${option.id}>
                    <input type="radio" ${
                      i + 1 === +cartItem.deliveryOptionId ? "checked" : ""
                    }
                      class="delivery-option-input"
                      name="delivery-option-${cartItem.productId}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateFormated(option.deliveryTime)}
                      </div>
                      <div class="delivery-option-price">
                        ${
                          !option.chargeCents
                            ? "Free"
                            : "$" +
                              (option.chargeCents / 100).toFixed(2) +
                              " - "
                        } Shipping
                      </div>
                    </div>
                  </div>`;
  });
  return genHTML;
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
    const [selectedOption] = deliveryOption.filter(
      (option) => option.id === cartItem.deliveryOptionId
    );
    cartHTML += `
              <div class="delivery-date js-delivery-date-${product.id}">
                Delivery date: ${dateFormated(selectedOption.deliveryTime)}
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
                      Quantity: <span class="quantity-label js-quantity-label-${
                        cartItem.productId
                      }">${cartItem.quantity}</span>
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
                ${renderDateSelector(cartItem)}
                </div>
              </div>
            </div>`;
  });

  orderSummaryEle.innerHTML = cartHTML;
}

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

    const parentEle = document.querySelector(
      `.cart-item-container-${productId}`
    );
    const quantityLabelEle = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    const saveEle = document.querySelector(`.js-save-quantity-${productId}`);
    const inputEle = document.querySelector(`.js-quantity-input-${productId}`);

    parentEle.classList.toggle("is-editing-quantity");

    function updatingQuantityValue() {
      const updateCartQuantity = +inputEle.value;
      parentEle.classList.remove("is-editing-quantity");
      if (updateCartQuantity < 0 || updateCartQuantity > 1000) return;
      updateQuantity(productId, updateCartQuantity);
      quantityLabelEle.innerHTML = updateCartQuantity;
      addToLocal(cart, "cart");
      renderTotalItems();
    }
    inputEle.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      updatingQuantityValue();
    });
    saveEle.addEventListener("click", updatingQuantityValue);
  });
});

document.querySelectorAll(".js-delivery-option").forEach((ele) => {
  ele.addEventListener("click", () => {
    const { productId, deliveryOptionId } = ele.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    //updating date
    const [option]=deliveryOption.filter(option=>option.id===deliveryOptionId)
    document.querySelector(`.js-delivery-date-${productId}`).innerHTML=`Delivery date: ${dateFormated(option.deliveryTime)}`;
  });
});

