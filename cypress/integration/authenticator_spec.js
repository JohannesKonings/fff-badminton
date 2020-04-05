//https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
//https://docs.cypress.io/guides/guides/environment-variables.html#Setting
describe("Authenticator:", function() {
  // Step 1: setup the application state
  beforeEach(function() {
    cy.visit("/");
  });

  describe("Sign In and out:", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    it("allows a user to signin", () => {
      // Step 2: Take an action (Sign in)
      cy.get(selectors.usernameInput).type(username, { log: false });
      cy.get(selectors.signInPasswordInput).type(password, { log: false });
      cy.get(selectors.signInSignInButton)
        .contains("Sign In")
        .click();

      // Step 3: Make an assertion (Check for sign-out text)
      cy.get(selectors.profileDropdown).click({ multiple: true, force: true });
      //cy.get(selectors.profileLogout).click({ multiple: true });
    });
  });
});
export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]',
  profileDropdown: '[data-test="profile-dropdown"]',
  profileLogout: '[data-test="profile-logout"]'
};
