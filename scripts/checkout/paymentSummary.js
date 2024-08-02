import { cart } from "../../data/cart.js";
import { deliveryOption } from "../../data/deliveryOptions.js";
import getProduct from "../utils/getProduct.js";
import getSame from "../utils/getSame.js";
import formatCurrency from "../utils/formatCurrency.js";

export function renderPaymentSummary() {
  const totalItemAmountCent = cart.reduce((price, item) => {
    const productDetails = getProduct(item.productId);
    return price + productDetails.priceCents * item.quantity;
  }, 0);
  const totalShippingChargeCent = cart.reduce((price, item) => {
    const selectedOption = getSame(deliveryOption, "id", item.deliveryOptionId);
    return price + selectedOption.chargeCents;
  }, 0);
  const totalBeforeTaxCent = totalItemAmountCent + totalShippingChargeCent;
  const taxAmount=totalBeforeTaxCent*0.1;
  const totalAfterTaxCent = totalBeforeTaxCent * 1.1;

  const renderHTML= `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemAmountCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalShippingChargeCent
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxAmount)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalAfterTaxCent)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
  document.querySelector('.js-payment-summary').innerHTML=renderHTML;
}
