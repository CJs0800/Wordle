describe('Make sure WORDLE is working well', () => {
    it('Test that we can open a browser and load our app', () => {
        cy.visit("http://127.0.0.1:4000/");
    }),
    it('Start game button starts a game', () => {
        cy.visit("http://127.0.0.1:4000/");
        cy.get("#new_game_button").click();
        cy.get("#game").should("be.visible");
    }),
    it('Input zzzzz is invalid', () => {
        cy.visit("http://127.0.0.1:4000/");
        cy.get("#new_game_button").click();

        cy.get("#keyboard-Z").click();
        cy.get("#keyboard-Z").click();
        cy.get("#keyboard-Z").click();
        cy.get("#keyboard-Z").click();
        cy.get("#keyboard-Z").click();
        
        cy.get("#enter").click();
        cy.get("#info_invalid_word").should("be.visible");

        cy.get("#Z0-1").should("contain.text", "Z");
        cy.get("#Z1-1").should("contain.text", "Z");
        cy.get("#Z2-1").should("contain.text", "Z");
        cy.get("#Z3-1").should("contain.text", "Z");
        cy.get("#Z4-1").should("contain.text", "Z");
    }),
    it('Input jante is accepted', () => {
        cy.visit("http://127.0.0.1:4000/");
        cy.get("#new_game_button").click();
    
        cy.get("#keyboard-J").click();
        cy.get("#keyboard-A").click();
        cy.get("#keyboard-N").click();
        cy.get("#keyboard-T").click();
        cy.get("#keyboard-E").click();
    
        cy.get("#enter").click();
        cy.get("#info_invalid_word").should("not.be.visible");
    
        cy.get("#J00").should("contain.text", "J");
        cy.get("#A10").should("contain.text", "A");
        cy.get("#N20").should("contain.text", "N");
        cy.get("#T30").should("contain.text", "T");
        cy.get("#E40").should("contain.text", "E");
    }),
    
    it('Forfeit button brings you to the defeat page', () => {
        cy.visit("http://127.0.0.1:4000/");
        cy.get("#new_game_button").click();
        cy.get("#forfeit_button").click();
        cy.get("#defeat").should("be.visible");
    }),
    it('Stats page should display', () => {
        cy.visit("http://127.0.0.1:4000/");
        cy.get("#stats_button").click();
        cy.get("#stats").should("be.visible");
    })
})