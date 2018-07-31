import { AppPage } from './app.po';

describe('flickr-pictures App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should contain input type text', () => {
    page.navigateTo();
    expect(page.getPhotosList()).toBeDefined();
  });
});
