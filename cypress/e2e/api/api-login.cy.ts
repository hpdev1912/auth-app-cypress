describe("API Login Suite", () => {
  it("POST an valid user information", () => {
    const userInfo = {
      email: "admin@yahoo.com",
      password: "123456",
    };

    cy.request({
      method: "POST",

      url: "/api/auth/login",

      body: userInfo,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.not.empty;
    });
  });
});
