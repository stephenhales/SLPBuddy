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

  constructor(private WebpageService:WebpageService) {}

  ngOnInit() {
    var vm = this;
    vm.WebpageService.getCurrentTabUrl((url) => {
      //vm.setColor();
      vm.getFormInputs();
    });

    //This allows the data to appear. it seems like there is an async issue.
    vm.delay(600);
  }

  getFormInputs(){
    console.log("page-view:");
    console.log(this.inputs);
    this.WebpageService.getFormInputs((inputs) => {
      this.inputs = inputs;
      console.log("Controller-GetformInputs");
      console.log(this.inputs);
    });
  }

  setColor(){
    var savedColor = "grey";
    this.WebpageService.setBackgroundColor(savedColor);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
