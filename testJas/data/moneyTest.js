import formatCurrency from "../../scripts/utils/formatCurrency.js";

describe("Test suite:Format Currency", () => {
  it("Converts cents to dollar", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("Work with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("Work with roundUp to nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
