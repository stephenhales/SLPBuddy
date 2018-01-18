import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../webpage.service';
//import { Input } from '../input';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {

  inputs: any[] = [{id: "demo id",name: "demo name",value: "demo value",type: "checkbox"}];
  textareas: any[] = [{id: "demo id",name: "demo name"}];
  template: string = "";
  url: string = "";

  constructor(private WebpageService:WebpageService) {}

  ngOnInit() {
    var vm = this;
    vm.WebpageService.getCurrentTabUrl((url) => {
      //vm.setColor();
      vm.url = url;
      vm.getFormInputs();
      vm.getFormTextAreas();
      vm.saveTemplate(vm.url, "demo this works");
      vm.getSavedTemplates(vm.url);
    });

    //This allows the data to appear. it seems like there is an async issue.
    vm.delay(600);
  }

  getFormInputs(){
    this.WebpageService.getFormInputs((inputs) => {
      var filteredInputs = [];
      inputs.forEach(function(input) {
        if(input.type != 'hidden')
        {
          filteredInputs.push(input);
        }
      });
      this.inputs = filteredInputs;
    });
  }

  getFormTextAreas(){
    this.WebpageService.getFormTextAreas((textareas) => {
      this.textareas = textareas;
    });
  }

  setColor(){
    var savedColor = "grey";
    this.WebpageService.setBackgroundColor(savedColor);
  }

  saveTemplate(url, text){
    console.log("save this: " + text);
    this.WebpageService.saveTemplate(url, text);
  }

  getSavedTemplates(url) {
    this.WebpageService.getSavedTemplates(url, (items) => {
      console.log("view items: " + items);
      this.template = items;
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
