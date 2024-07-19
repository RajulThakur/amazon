export const cart=[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:1
},{
  productId: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
  quantity:2
}];

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
      return;
    }
  });
  !isPresent && cart.push({ productId, quantity: productToAdd });
}

export function updateCartQuantity(){
  const cartQuantityEle = document.querySelector(".js-cart-quantity");
  let cartQuantity = 0; //cart.reduce((acc,ele)=>acc+ele.quantity,0) ||;
  cart.forEach(cartItem=>{
    cartQuantity+=cartItem.quantity
  })
  cartQuantityEle.innerHTML=cartQuantity;

}

