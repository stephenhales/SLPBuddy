///<reference path="../../node_modules/@types/chrome/index.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class WebpageService {
  constructor() { }

  getFormTextAreas(callback) {
    //var framePath = 'window.frames[1].document.frames[1].document.frames[1].'
    chrome.tabs.executeScript({
      //change to use file https://developer.chrome.com/extensions/tabs#method-executeScript
      code: `
        var htmlCollection = window.document.getElementsByTagName('textarea');
        var inputs = Array.from(htmlCollection);
        var items = [];

        inputs.forEach(function(input) {
          var item = (({name, id}) => ({name, id}))(input);
          items.push(item);
        });
        console.log(htmlCollection);
        console.log(items);
        items`
    },
    function(result){
      callback(result[0]);
    });
  }

  setFormTextArea(callback) {
    //var framePath = 'window.frames[1].document.frames[1].document.frames[1].'
    chrome.tabs.executeScript({
      //change to use file https://developer.chrome.com/extensions/tabs#method-executeScript
      code: `
        var htmlCollection = window.document.getElementsByTagName('textarea');
        var inputs = Array.from(htmlCollection);
        var items = [];

        inputs.forEach(function(input) {
          var item = (({name, id}) => ({name, id}))(input);
          items.push(item);
        });
        console.log(htmlCollection);
        console.log(items);
        items`
    },
    function(result){
      callback(result[0]);
    });
  }

  getFormInputs(callback) {
    //var framePath = 'window.frames[1].document.frames[1].document.frames[1].'
    chrome.tabs.executeScript({
      //change to use file https://developer.chrome.com/extensions/tabs#method-executeScript
      code: `
        var htmlCollection = window.document.getElementsByTagName('input');
        var inputs = Array.from(htmlCollection);
        var items = [];

        inputs.forEach(function(input) {
          var item = (({name, id, value, type}) => ({name, id, value, type}))(input);
          items.push(item);
        });
        console.log(htmlCollection);
        console.log(items);
        items`
    },
    function(result){
      callback(result[0]);
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

  saveTemplate(id, text) {
    var items = {};
    items[id] = text;
    // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
    // optional callback since we don't need to perform any action once the
    // background color is saved.
    chrome.storage.sync.set(items);
    console.log("saved: " + items[id]);
  }

  getSavedTemplates(id, callback) {
    // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
    // for chrome.runtime.lastError to ensure correctness even when the API call
    // fails.
    chrome.storage.sync.get(id, (items) => {
      callback(chrome.runtime.lastError ? null : items[id]);
    });
  }
}
