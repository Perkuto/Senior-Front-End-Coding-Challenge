import { AppPage } from './app.po';

describe('flickr-pictures App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display 100 photos on loading', () => {
    page.navigateTo();
    expect(page.getPhotosList().count()).toEqual(100);
  });

  it('should display 2 photos when using a keyword in URL and should update the input text with the keyword', () => {
    page.navigateTo('my%20keyword');
    expect(page.getPhotosList().count()).toEqual(2);
    expect(page.getInputText().getAttribute('value')).toEqual('my keyword');
  });

  it('should display 2 photos when typing a keyword in the input and should update the URL accordingly', () => {
    page.navigateTo();
    page.getInputText().sendKeys('another keyword');
    expect(page.getPhotosList().count()).toEqual(2);
    expect(page.getCurrentUrl()).toContain('another%20keyword');
  });

  it('should open a popup when clicking on twitter icon', () => {
    page.navigateTo('bird');
    const currentUrl = page.getCurrentUrl();
    page.getTwitterButton().click();
    expect(page.getWindowsCount()).toEqual(2);
  });

});
