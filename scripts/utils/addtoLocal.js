export default function addToLocal(data,name){
  localStorage.setItem(`${name}`,JSON.stringify(data));
}