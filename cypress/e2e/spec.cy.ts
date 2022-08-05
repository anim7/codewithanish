const url = "http://localhost:3000"

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit(url)
    cy.wait(1000)
  })
  it("should display the home page", () => {
    cy.contains("Hi, I am Anish.")
  })
  it("should be able to navigate to the blog page using the link", () => {
    cy.get("#blog").click()
    cy.wait(2000)
    cy.url().should("include", "/blog")
  })
  it("should be able to navigate to the tech stack page using the link", () => {
    cy.get("#tech-stack").click()
    cy.wait(3000)
    cy.url().should("include", "/tech_stack")
  })
  it("should be able to navigate to the login page", () => {
    try {
      cy.get("#login").click()
      cy.wait(2000)
    } catch (err) {
      cy.get("#logout").click()
      cy.wait(2000)
      cy.get("#login").click()
      cy.wait(2000)
    }
    cy.url().should("include", "/login")
  })
})

describe("Tech Stack", () => {
  beforeEach(() => {
    cy.visit(`${url}/blog`)
    cy.wait(1000)
  })
  it("should be able to navigate to a post page", () => {
    const currUrl = cy.url()
    cy.get(".postlink").first().click()
    cy.wait(2000)
    cy.url().should("not.eq", currUrl)
  })
})
