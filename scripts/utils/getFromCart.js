export default function getFromLocal(saved){
  const data=JSON.parse(localStorage.getItem(saved));
  return data;
}