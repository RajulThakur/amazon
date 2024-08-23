import {
  removeFromCart,
  cart,
  itemsInCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { deliveryOption } from "../../data/deliveryOptions.js";
import addToLocal from "../utils/addtoLocal.js";
import getProduct from "../utils/getProduct.js";
import getSame from "../utils/getSame.js";
import formatCurrency from "../utils/formatCurrency.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";
import isWeekend from "../utils/isWeekend.js";

function dateFormated(day) {
  let finalDeliveryDate = dayjs();
  while (day != 0) {
    finalDeliveryDate=finalDeliveryDate.add(1, "day");
    if (!isWeekend(finalDeliveryDate)) {
      day--;
    }
  }
  return finalDeliveryDate.format("D MMM, dddd");
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
    const product = getProduct(cartItem.productId);
    const [selectedOption] = deliveryOption.filter(
      (option) => option.id === cartItem.deliveryOptionId
    );
    cartHTML += `
    <div class='cart-item-container cart-item-container-${product.id}'>
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
                    ${product.getPrice()}
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
              </div>
            </div>`;
  });

  orderSummaryEle.innerHTML = cartHTML;
}

export function renderOrderSummary() {
  renderCheckoutHeader();
  renderCheckout();

  document.querySelectorAll(".js-delete-link").forEach((deleteEle) => {
    deleteEle.addEventListener("click", () => {
      const { productId } = deleteEle.dataset;
      removeFromCart(productId);
      renderCheckout();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-quantity-link").forEach((updateEle) => {
    updateEle.addEventListener("click", () => {
      const { productId } = updateEle.dataset;

      const parentEle = document.querySelector(
        `.cart-item-container-${productId}`
      );
      const quantityLabelEle = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      const saveEle = document.querySelector(`.js-save-quantity-${productId}`);
      const inputEle = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      parentEle.classList.toggle("is-editing-quantity");

      function updatingQuantityValue() {
        const updateCartQuantity = +inputEle.value;
        parentEle.classList.remove("is-editing-quantity");
        if (updateCartQuantity < 0 || updateCartQuantity > 1000) return;
        updateQuantity(productId, updateCartQuantity);
        quantityLabelEle.innerHTML = updateCartQuantity;
        addToLocal(cart, "cart");
        renderCheckoutHeader();
        renderPaymentSummary();
      }
      inputEle.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        updatingQuantityValue();
        renderPaymentSummary();
      });
      saveEle.addEventListener("click", updatingQuantityValue);
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((ele) => {
    ele.addEventListener("click", () => {
      const { productId, deliveryOptionId } = ele.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      //updating date
      const option = getSame(deliveryOption, "id", deliveryOptionId);
      // const [option]=deliveryOption.filter(option=>option.id===deliveryOptionId)
      document.querySelector(
        `.js-delivery-date-${productId}`
      ).innerHTML = `Delivery date: ${dateFormated(option.deliveryTime)}`;
      renderPaymentSummary();
    });
  });
}
