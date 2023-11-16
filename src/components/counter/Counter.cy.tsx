import React from "react";
import Counter from "./Counter";

describe("Counter", () => {
  it("should display the initial count at 0", () => {
    cy.mount(<Counter />);
    cy.get("p").should("have.text", "The current count is 0");
  });
  it("should increment the count when the button is clicked", () => {
    cy.mount(<Counter />);
    cy.get("button").click();
    cy.get("p").should("have.text", "The current count is 1");
  });
});
