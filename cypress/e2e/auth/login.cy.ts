describe("Login Suite", () => {
  beforeEach(() => {
    cy.fixture("users").as("usersData");
  });

  it("should log in with valid credentials", function () {
    const { validUser } = this.usersData;

    // Perform login
    cy.loginViaUser(validUser);

    // Assertion: Check if the login is successful
    cy.get(".Toastify__toast--success").should("be.visible");
    cy.get(".Toastify__toast--success").should("have.text", "Welcome");
    cy.url().should("include", "/dashboard"); // Adjust the URL accordingly
  });

  it("should not log in with invalid email", function () {
    // cy.intercept("POST", "/api/auth/login", {
    //   statusCode: 200,
    //   body: {
    //     token: "mocked-token",
    //   },
    // }).as("loginStub");
    const { invalidUserEmail } = this.usersData;

    // Perform login
    cy.loginViaUser(invalidUserEmail);

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Invalid username or password.Please try again",
    );
  });

  it("should not log in with invalid password", function () {
    const { invalidUserPassword } = this.usersData;

    // Perform login
    cy.loginViaUser(invalidUserPassword);

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Invalid username or password.Please try again",
    );
  });
});
