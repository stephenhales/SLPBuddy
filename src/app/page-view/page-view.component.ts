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
  textValue = 'initial value';

  constructor(private WebpageService:WebpageService) {}

  ngOnInit() {
    var vm = this;
    vm.WebpageService.getCurrentTabUrl((url) => {
      vm.url = url;
      vm.getFormTextAreas();
    });

    //This allows the data to appear. it seems like there is an async issue.
    vm.delay(200);
  }

  getFormTextAreas(){
    this.WebpageService.getFormTextAreas((textareas) => {
      this.textareas = textareas;
    });
  }

  saveTemplate(id, text){
    console.log("save this: " + text);
    this.WebpageService.saveTemplate(id, text);
  }

  getSavedTemplate(id) {
    this.WebpageService.getSavedTemplates(id, (item) => {
      console.log(id + ": " + item);
      return item;
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
