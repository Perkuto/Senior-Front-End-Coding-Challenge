import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPhotosList() {
    return element(by.css('app-root app-photo-list')).getText();
  }
}
