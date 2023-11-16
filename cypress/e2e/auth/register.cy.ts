import { v4 } from "uuid";

describe("Register Suite", () => {
  beforeEach(() => {
    cy.fixture("register-user").as("usersData");
    cy.visit("/auth/register");
  });

  it("should not register when user not confirm password", function () {
    const { userNoConfirmPassword } = this.usersData;
    // Perform register
    cy.get("[data-cy=email]").type(userNoConfirmPassword.email);
    cy.get("[data-cy=password]").type(userNoConfirmPassword.password);
    cy.get("[data-cy=confirm]").type("12345");
    cy.get("[data-cy=register-btn]").click();

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Password and confirm password do not match!",
    );
  });

  it("should not register with password less than 8 character", function () {
    const { passwordLessThan8Character } = this.usersData;

    // Perform register
    cy.get("[data-cy=email]").type(passwordLessThan8Character.email);
    cy.get("[data-cy=password]").type(passwordLessThan8Character.password);
    cy.get("[data-cy=confirm]").type(passwordLessThan8Character.password);
    cy.get("[data-cy=register-btn]").click();

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Password must be at least 8 characters long",
    );
  });

  it.skip("should not register with incorrect email format", function () {
    const { userEmailIncorrectFormat } = this.usersData;
    // Perform register
    cy.registerViaUser(userEmailIncorrectFormat);

    cy.get<HTMLInputElement>("[data-cy=email]").then(($input) => {
      expect($input[0].validationMessage).is.not.empty;
    });
  });

  it("should not register with password not have lowercase letter", function () {
    const { passwordNoHaveLowercase } = this.usersData;

    // Perform register
    cy.registerViaUser(passwordNoHaveLowercase);

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Password must contain at least one lowercase letter",
    );
  });

  it("should not register with password not have uppercase letter", function () {
    const { passwordNoHaveUpperCase } = this.usersData;

    // Perform register
    cy.registerViaUser(passwordNoHaveUpperCase);

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Password must contain at least one uppercase letter",
    );
  });

  it("should not register with password not have any number", function () {
    const { passwordNoHaveNumber } = this.usersData;

    // Perform register
    cy.registerViaUser(passwordNoHaveNumber);

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Password must contain at least one number",
    );
  });

  it("should not register with password not have special character", function () {
    const { passwordNoHaveSpecialCharacter } = this.usersData;

    // Perform register
    cy.registerViaUser(passwordNoHaveSpecialCharacter);

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should(
      "have.text",
      "Password must contain at least one special symbol",
    );
  });

  it("should not register with email was taken", function () {
    const { userEmailWasTaken } = this.usersData;

    // Perform register
    cy.registerViaUser(userEmailWasTaken);

    // Check toast show
    cy.get(".Toastify__toast--error").should("be.visible");
    cy.get(".Toastify__toast--error").should("have.text", "This email was taken!");
  });

  it.only("should register with correct user information", function () {
    cy.intercept("POST", "/api/auth/register", {
      statusCode: 200,
      body: {
        userData: "mocked-user",
      },
    }).as("registerStub");
    const { availableUser } = this.usersData;

    const username = `user_${v4()}`;
    const email = `${username}@example.com`;

    // Perform register
    cy.registerViaUser({ ...availableUser, email });

    // Check toast show
    cy.get(".Toastify__toast--success").should("be.visible");
    cy.get(".Toastify__toast--success").should("have.text", "Register successful");
    cy.url().should("include", "/auth/login");
  });

  it("should login success after register successful", function () {
    const { availableUser } = this.usersData;

    const username = `user_${v4()}`;
    const email = `${username}@example.com`;

    const uniqueUser = { ...availableUser, email };

    // Perform register
    cy.registerViaUser(uniqueUser);

    // Check toast show
    cy.get(".Toastify__toast--success").should("be.visible");
    cy.get(".Toastify__toast--success").should("have.text", "Register successful");
    cy.url().should("include", "/auth/login");

    cy.loginViaUser(uniqueUser);
    cy.get(".Toastify__toast--success").should("be.visible");
    cy.get(".Toastify__toast--success").should("have.text", "Welcome");
    cy.url().should("include", "/dashboard");
  });
});

// describe.skip("Register Suite2", () => {
//   beforeEach(() => {
//     cy.fixture("register-user").as("usersData");
//     cy.visit("/auth/register");
//   });

//   it.skip("should not register with incorrect email format", function () {
//     const { userEmailIncorrectFormat } = this.usersData;
//     // Perform register
//     cy.registerViaUser(userEmailIncorrectFormat);

//     // Check toast show when login unsuccessful
//     cy.get<HTMLInputElement>("[data-cy=email]").then(($input) => {
//       expect($input[0].validationMessage).is.not.empty;
//     });
//   });

//   it("should not register when user not confirm password", function () {
//     const { userNoConfirmPassword } = this.usersData;
//     // Perform login
//     cy.get("[data-cy=email]").type(userNoConfirmPassword.email);
//     cy.get("[data-cy=password]").type(userNoConfirmPassword.password);
//     cy.get("[data-cy=confirm]").type("12345");
//     cy.get("[data-cy=register-btn]").click();

//     // Check toast show
//     cy.get(".Toastify__toast--error").should("be.visible");
//     cy.get(".Toastify__toast--error").should(
//       "have.text",
//       "Password and confirm password do not match!",
//     );
//   });

//   it("should not register with password less than 8 character", function () {
//     const { passwordLessThan8Character } = this.usersData;

//     // Perform login
//     cy.get("[data-cy=email]").type(passwordLessThan8Character.email);
//     cy.get("[data-cy=password]").type(passwordLessThan8Character.password);
//     cy.get("[data-cy=confirm]").type(passwordLessThan8Character.password);
//     cy.get("[data-cy=register-btn]").click();

//     // Check toast show when login unsuccessful
//     cy.get(".Toastify__toast--error").should("be.visible");
//     cy.get(".Toastify__toast--error").should(
//       "have.text",
//       "Password must be at least 8 characters long.",
//     );
//   });

//   it("should not register with password not have lowercase letter", function () {
//     const { passwordNoHaveLowercase } = this.usersData;

//     // Perform login
//     cy.get("[data-cy=email]").type(passwordNoHaveLowercase.email);
//     cy.get("[data-cy=password]").type(passwordNoHaveLowercase.password);
//     cy.get("[data-cy=confirm]").type(passwordNoHaveLowercase.password);
//     cy.get("[data-cy=register-btn]").click();

//     // Check toast show when login unsuccessful
//     cy.get(".Toastify__toast--error").should("be.visible");
//     cy.get(".Toastify__toast--error").should(
//       "have.text",
//       "Password must contain at least one lowercase letter",
//     );
//   });

//   it("should not register with password not have uppercase letter", function () {
//     const { passwordNoHaveUpperCase } = this.usersData;

//     // Perform login
//     cy.get("[data-cy=email]").type(passwordNoHaveUpperCase.email);
//     cy.get("[data-cy=password]").type(passwordNoHaveUpperCase.password);
//     cy.get("[data-cy=confirm]").type(passwordNoHaveUpperCase.password);
//     cy.get("[data-cy=register-btn]").click();

//     // Check toast show when login unsuccessful
//     cy.get(".Toastify__toast--error").should("be.visible");
//     cy.get(".Toastify__toast--error").should(
//       "have.text",
//       "Password must contain at least one uppercase letter",
//     );
//   });

//   it("should not register with password not have any number", function () {
//     const { passwordNoHaveNumber } = this.usersData;

//     // Perform login
//     cy.get("[data-cy=email]").type(passwordNoHaveNumber.email);
//     cy.get("[data-cy=password]").type(passwordNoHaveNumber.password);
//     cy.get("[data-cy=confirm]").type(passwordNoHaveNumber.password);
//     cy.get("[data-cy=register-btn]").click();

//     // Check toast show when login unsuccessful
//     cy.get(".Toastify__toast--error").should("be.visible");
//     cy.get(".Toastify__toast--error").should(
//       "have.text",
//       "Password must contain at least one number",
//     );
//   });

//   it("should not register with password not have special character", function () {
//     const { passwordNoHaveSpecialCharacter } = this.usersData;

//     // Perform login
//     cy.get("[data-cy=email]").type(passwordNoHaveSpecialCharacter.email);
//     cy.get("[data-cy=password]").type(passwordNoHaveSpecialCharacter.password);
//     cy.get("[data-cy=confirm]").type(passwordNoHaveSpecialCharacter.password);
//     cy.get("[data-cy=register-btn]").click();

//     // Check toast show when login unsuccessful
//     cy.get(".Toastify__toast--error").should("be.visible");
//     cy.get(".Toastify__toast--error").should(
//       "have.text",
//       "Password must contain at least one special symbol",
//     );
//   });

//   it("should not register with email was taken", function () {
//     const { userEmailWasTaken } = this.usersData;

//     // Perform login
//     cy.get("[data-cy=email]").type(userEmailWasTaken.email);
//     cy.get("[data-cy=password]").type(userEmailWasTaken.password);
//     cy.get("[data-cy=confirm]").type(userEmailWasTaken.password);
//     cy.get("[data-cy=register-btn]").click();

//     // Check toast show when login unsuccessful
//     cy.get(".Toastify__toast--error").should("be.visible");
//     cy.get(".Toastify__toast--error").should("have.text", "This email was taken!");
//   });

//   it("should register with correct user information", function () {
//     // cy.intercept("POST", "/api/auth/register", {
//     //   statusCode: 200,
//     //   body: {
//     //     userData: "mocked-user",
//     //   },
//     // }).as("registerStub");
//     const { availableUser } = this.usersData;

//     const username = `user_${v4()}`;
//     const email = `${username}@example.com`;

//     // Perform login
//     cy.registerViaUser({ ...availableUser, email });

//     // Check toast show when login unsuccessful
//     cy.get(".Toastify__toast--success").should("be.visible");
//     cy.get(".Toastify__toast--success").should("have.text", "Register successful");
//     cy.url().should("include", "/auth/login");
//   });
// });
