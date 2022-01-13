
describe('Test my Todo component', ()=>{

    // it('Change the different TodoList background', () => {
    //     cy.visit('http://localhost:8080/');
    //     cy.get('.bg-blue-400').click()
    //     cy.get('.bg-purple-600').click()
    //     cy.get('.bg-black').click()
    //     cy.get('.bg-gray-200').click()
    // })

    it('Add some tasks to the list', ()=>{
        cy.visit('http://localhost:8080/');
        cy.get('.b-b').type('First task {enter}')
        cy.get('.b-b').type('Second task {enter}')
        cy.get('.b-b').type('Thirty task {enter}')
        cy.get('.b-b').type('Four task {enter}')
        cy.get('.list .task').should('have.length', 4);
    })

    // it('add some task and delete some on it', ()=>{
    //     cy.visit('http://localhost:8080/');
    //     cy.get('.b-b').type('First task {enter}')
    //     cy.get('.b-b').type('Second task {enter}')
    //     cy.get('.list .task:nth-child(3) > .todo > .actions > #delete > svg').click()
    //     cy.get('.b-b').type('Thirty task {enter}')
    //     cy.get('.b-b').type('Four task {enter}')
    //     cy.get('.list .task:nth-child(3) > .todo > .actions > #delete > svg').click()
    // })
    //
    // it('Change the state of a task', ()=>{
    //     cy.visit('http://localhost:8080/');
    //     cy.get('.b-b').type('First task {enter}')
    //     cy.get('.b-b').type('Second task {enter}')
    //     cy.get('.list .task:nth-child(3) > .todo > .check > input').click()
    //     cy.get('.task > .todo > .check > input').click()
    //     cy.get('.list :nth-child(4) > .check > input').click()
    // })
    //
    // it('should delete the already done task', ()=> {
    //     cy.visit('http://localhost:8080/');
    //     cy.get('.b-b').type('First task {enter}')
    //     cy.get('.b-b').type('Second task {enter}')
    //     cy.get('.list .task:nth-child(3) > .todo > .check > input').click()
    //     cy.get('.task > .todo > .check > input').click()
    //     cy.get('.list :nth-child(4) > .actions > #delete > svg').click()
    //     cy.get('.list #delete > svg').click()
    // });
})