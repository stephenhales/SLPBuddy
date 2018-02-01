///<reference path="../../node_modules/@types/chrome/index.d.ts" />

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from "rxjs/Subject";
import { Http } from '@angular/http';
import { Input } from './datatypes/input';

@Injectable()
export class MembraneService {
  inputs: any[] = [{id: "demo id",name: "demo name",value: "demo value",type: "checkbox"}];
  textareas: any[] = [{id: "demo id",name: "demo name"}];
  templates: any[] = [{id: "demo id", text: "demo text"}];

  public $url = new Subject<any>();

  constructor() { }

  getFormTextAreas() {
    var promise = new Promise((resolve, reject) => {
      chrome.tabs.executeScript({
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
        resolve(result[0]);
      });
    });
    return promise;
  }

  setFormTextArea(callback) {
    chrome.tabs.executeScript({
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

  getCurrentTabUrl() {
    var promise = new Promise((resolve, reject) => {
      var queryInfo = { active: true, currentWindow: true };
      chrome.tabs.query(queryInfo, (tabs) => {
        var tab = tabs[0];
        console.assert(typeof tab.url == 'string', 'tab.url should be a string');
        resolve(tab.url);
      });
    });
    return promise;
  }

  saveTemplate(id, text) {
    var items = {};
    items[id] = text;
    chrome.storage.sync.set(items);
    console.log("saved: " + items[id]);
  }

  getSavedTemplate(id) {
    var promise = new Promise((resolve, reject) => {
      chrome.storage.sync.get(id, (templates) => {
        resolve(chrome.runtime.lastError ? null : templates[id]);
      });
    });
    return promise;
  }
}
