describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a new todo', () => {
    cy.get('.btn-primary').click();
    const title = 'New Todo';
    const description = 'This is a new todo';

    cy.get('#title').type(title);
    cy.get('#description').type(description);
    cy.get('#isDone').uncheck();

    cy.get('#submit_button').click();

    cy.get('#task_title').should('contain.text', title);
    cy.get('#checked_button').should('not.contain.text', 'Completed');

  });

  it('should mark a todo as done', () => {
    cy.get('.btn-primary').click();
    const title = 'Todo 1';
    const description = 'This is Todo 1';

    cy.get('#title').type(title);
    cy.get('#description').type(description);
    cy.get('#isDone').uncheck();

    cy.get('#submit_button').click();

    cy.get('#checked_button').click();

  });

  it('should delete a todo', () => {
    cy.get('.btn-primary').click();
    const title = 'Todo 1';
    const description = 'This is Todo 1';

    cy.get('#title').type(title);
    cy.get('#description').type(description);
    cy.get('#isDone').uncheck();

    cy.get('#submit_button').click();

    cy.get('#delete_button').click();
  });

  it('should edit a todo', () => {
    cy.get('.btn-primary').click();
    const title = 'Todo 1';
    const description = 'This is Todo 1';

    cy.get('#title').type(title);
    cy.get('#description').type(description);
    cy.get('#isDone').uncheck();

    cy.get('#submit_button').click();
    
    cy.get('#edit_button').click();
    const updatedTitle = 'Updated Todo';
    const updatedDescription = 'This is an updated todo';

    cy.get('#title').type(updatedTitle);
    cy.get('#description').type(updatedDescription);
    cy.get('#isDone').uncheck();

    cy.get('#submit_button').click();
  });
});
