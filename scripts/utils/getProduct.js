import { products } from "../../data/products.js"

export default function getProduct(id){
  return products.filter(product=>product.id===id)[0];
}