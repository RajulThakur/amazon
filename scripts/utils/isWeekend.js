function isWeekend(date) {
  const result = +date.format("d");
  return result === 0 || result === 6;
}

export default isWeekend;
