import {browser, protractor, by, element} from 'protractor';
import { AddTodoPage } from './add-todo.po';

describe('Add todo', () => {
  let page: AddTodoPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AddTodoPage();
    page.navigateTo();
  });


  it('Should have the correct title', () => {
    expect(page.getTitle()).toEqual('New Todo');
  });


  it('Should enable and disable the add todo button', async () => {
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('ownerField', 'Bob');
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('categoryField', 'homework');
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('bodyField', 'hi how are you');
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(true);
  });
});
