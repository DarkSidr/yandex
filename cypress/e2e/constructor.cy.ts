describe("app works correctly constructor", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as(
      "ingredients"
    );
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("accessToken", "test-accessToken");

    cy.get('[data-cy="ingredients"]').as("items");
    cy.get('[data-cy="dropZone"]').as("drop");
    cy.get('[data-cy="orderSubmit"]').as("orderSubmit");

    cy.get("@items").children().first().as("bun");
    cy.get("@items").children().eq(2).as("sause");
    cy.get("@items").children().last().as("main");
  });

  it("should open main page, loaded ingredients", function () {
    cy.contains("Соберите бургер");
    cy.get("@ingredients");
  });

  it("user is authorized", function () {
    cy.getCookie("accessToken");
  });

  it("create order", function () {
    cy.get("@orderSubmit").click();
    cy.intercept("POST", "api/auth/login", { fixture: "userLogin.json" }).as(
      "userLogin"
    );
    cy.get("[name=email]").type(`dsgsdgsdgdsg@fgsdagdsgsdg.com`);
    cy.get("[name=password]").type(`1234567890`);

    cy.contains("Войти").click();

    cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("user");

    cy.get("@bun").trigger("dragstart");
    cy.get("@drop").trigger("drop");
    cy.get("@sause").trigger("dragstart");
    cy.get("@drop").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("@drop").trigger("drop");

    cy.get("@orderSubmit").click();

    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );
  });
});
