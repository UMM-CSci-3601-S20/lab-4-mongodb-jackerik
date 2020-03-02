import {TodoPage} from './todo-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Todo list', () => {
  let page: TodoPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
  });


  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });


  it('Should type something in the owner filter and check that it returned correct elements', async () => {
    await page.typeInput('todo-owner-input', 'Blanche');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-owner')).getText()).toEqual('Blanche');
    });
  });


  it('Should type something in the category filter and check that it returned correct elements', async () => {
    await page.typeInput('todo-category-input', 'groceries');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-category')).getText()).toEqual('groceries');
    });
  });


  it('Should type something in the body filter and check that it returned correct elements', async () => {
    await page.typeInput('todo-body-input',
    'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.'
    );

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-body')).getText()).toEqual(
        'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.'
        );
    });
  });


  it('Should select a status and check that it returned correct elements', async () => {
    await page.selectMatSelectValue('todo-status-select', 'complete');

    expect(page.getTodoCards().count()).toBeGreaterThan(0);

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-status-complete')).getText()).toEqual('Complete');
    });
  });



  it('Should click add todo and go to the right URL', async () => {
    await page.clickAddTodoFAB();

    await browser.wait(EC.urlContains('todos/new'), 10000);

    const url = await page.getUrl();
    expect(url.endsWith('/todos/new')).toBe(true);

    expect(element(by.className('add-todo-title')).getText()).toEqual('New Todo');
  });
});
