export default function getSame(arr,label,parameter){
  return arr.filter(item=>item[label]===parameter)[0];
} 