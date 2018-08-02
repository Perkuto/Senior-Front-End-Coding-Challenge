import {browser, by, element} from 'protractor';

export class AppPage {

  navigateTo(keyword: string = '') {
    return browser.get('/#/' + keyword);
  }

  getCurrentUrl () {
    return browser.getCurrentUrl();
  }

  getInputText() {
    return element(by.css('input[type="text"]'));
  }

  getTextArea() {
    return element(by.css('textarea'));
  }

  getPhotosList() {
    return element.all(by.css('app-photo'));
  }

  getTwitterButton() {
    return element(by.css('share-button[button="twitter"]'));
  }

  getWindowsCount () {
    return browser.getAllWindowHandles().then((handles) => {
      return handles.length;
    });
  }

}
