///<reference path="../../node_modules/@types/chrome/index.d.ts" />
//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chrome/index.d.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Input } from './datatypes/input';
import { Rx } from 'rxjs/Rx';

@Injectable()
export class MembraneService {
  inputs: any[] = [{id: "demo id",name: "demo name",value: "demo value",type: "checkbox"}];
  textareas: any[] = [{id: "demo id",name: "demo name"}];
  templates: any[] = [{id: "demo id", text: "demo text"}];

  constructor() { }

  getFormTextAreas() {
    return Rx.Observable.create(function() {
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
        return result[0];
      });
    });
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
    return Rx.Observable.create(function() {
      var queryInfo = { active: true, currentWindow: true };
      chrome.tabs.query(queryInfo, (tabs) => {
        var tab = tabs[0];
        console.assert(typeof tab.url == 'string', 'tab.url should be a string');
        return tab.url;
      });
    });
  }

  saveTemplate(id, text) {
    var items = {};
    items[id] = text;
    chrome.storage.sync.set(items);
    console.log("saved: " + items[id]);
  }

  getSavedTemplates(id, callback) {
    chrome.storage.sync.get(id, (items) => {
      callback(chrome.runtime.lastError ? null : items[id]);
    });
  }

  // getTasks() {
  //   // return an observable
  //   return this.http.get('/api/v1/tasks.json')
  //   .map( (responseData) => {
  //     return responseData.json();
  //   })
  //   .map((tasks: Array<any>) => {
  //     let result:Array<Task> = [];
  //     if (tasks) {
  //       tasks.forEach((task) => {
  //         result.push(
  //                    new Task(task.id,
  //                             task.description,
  //                             task.dueDate,
  //                             task.complete));
  //       });
  //     }
  //     return result;
  //   });
  // }
}
