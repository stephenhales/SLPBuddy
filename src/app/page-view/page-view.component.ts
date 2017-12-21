import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../webpage.service';
//import { Input } from '../input';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
  inputs = [{
    id: "demo id",
    name: "demo name",
    value: "demo value",
    type: "checkbox"
  }];

  constructor(private WebpageService:WebpageService) {}

  ngOnInit() {
    var vm = this;
    vm.WebpageService.getCurrentTabUrl((url) => {
      vm.setColor();
      vm.nodeListToArray();
    });
  }

  nodeListToArray(){
    var nodeList;

    this.WebpageService.getFormInputs((items) => {
      console.log("page-view:");
      console.log(items);
      this.inputs = items;
    });
  }

  setColor(){
    var savedColor = "grey";
    this.WebpageService.setBackgroundColor(savedColor);
  }
}
