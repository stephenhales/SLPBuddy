///<reference path="../../node_modules/@types/chrome/index.d.ts" />

import { Injectable } from '@angular/core';
import { Input } from './input';

@Injectable()
export class WebpageService {
  constructor() { }
  // Copyright (c) 2014 The Chromium Authors. All rights reserved.
  // Use of this source code is governed by a BSD-style license that can be
  // found in the LICENSE file.

  getFormInputsScript() {
    var inputs = window.document.getElementsByTagName('input');
    //(<HTMLInputElement>window.frames[5].document.getElementById('FIE_COM_ParentTeacherInformation')).value = 'new text';
    console.log(inputs);
  }

  getFormInputsOld() {
    var inputs;
    var nodeList;

    nodeList = document.getElementsByTagName('input');
    inputs = [].slice.call(nodeList);
    console.log(inputs);
    return inputs;
  }

  getFormInputs() {
    var framePath = 'window.frames[1].document.frames[1].document.frames[1].'
    var scriptString = "";

    scriptString = Function.prototype.toString.call(this.getFormInputsScript);

    chrome.tabs.executeScript({
      //change to use file https://developer.chrome.com/extensions/tabs#method-executeScript
      code: '('+ scriptString +')();'
    }, function(result){
      console.log(result[0]);
    });
  }

  getCurrentTabUrl(callback) {
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
      var tab = tabs[0];
      var url = tab.url;
      console.assert(typeof url == 'string', 'tab.url should be a string');
      callback(url);
    });
  }

  changeBackgroundColor(color) {
    var someVar = "";
    var scriptBackground = 'document.body.style.backgroundColor="' + color + '";';

    chrome.tabs.executeScript({
      code:  scriptBackground
    }, function(result){
      console.log(result);
    });
  }

  // //TODO
  // getSavedBackgroundColor(url, callback) {
  //   // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  //   // for chrome.runtime.lastError to ensure correctness even when the API call
  //   // fails.
  //   chrome.storage.sync.get(url, (items) => {
  //     callback(chrome.runtime.lastError ? null : items[url]);
  //   });
  // }
  //
  // //TODO
  // saveBackgroundColor(url, color) {
  //   var items = {};
  //   items[url] = color;
  //   // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
  //   // optional callback since we don't need to perform any action once the
  //   // background color is saved.
  //   chrome.storage.sync.set(items);
  // }

  //TODO
  // this.getSavedBackgroundColor(url, (savedColor) => {
  //   if (savedColor) {
  //     this.changeBackgroundColor(savedColor);
  //     //dropdown.value = savedColor;
  //   }
  // });

  //TODO
  // Ensure the background color is changed and saved when the dropdown
  // selection changes.
  //
  // dropdown.addEventListener('change', () => {
  //   changeBackgroundColor(dropdown.value);
  //   saveBackgroundColor(url, dropdown.value);
  // });
}
