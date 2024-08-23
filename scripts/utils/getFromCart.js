export default function getFromLocal(saved) {
  try {
    const data = JSON.parse(localStorage.getItem(saved));
    return data;
  } catch (error) {
    return null;
  }
}