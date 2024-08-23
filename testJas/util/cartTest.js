import { addToCart, cart } from "../../data/cart.js";
import getFromLocal from "../../scripts/utils/getFromCart.js";

describe("Test suite: Add to cart", () => {
  // it("Add to existing Product",()=>{
  //   // addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
  //   // cart.
  // })
  it("Add to non existing Product", () => {
    sypOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    })
    getFromLocal('cart')
    addToCart("58b4fc92-e98c-42aa-8c55-b6b79996769a");
    expect(cart.length).toEqual(1);
  });
});
