import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../webpage.service';
import { Input } from '../input';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
  inputs: Input;

  constructor(private webpageService:WebpageService) {}

  ngOnInit() {
    var vm = this;
    vm.webpageService.getCurrentTabUrl((url) => {
      var savedColor = "grey";
      vm.webpageService.setBackgroundColor(savedColor);

      vm.nodeListToArray();
    });
  }

  nodeListToArray(){
    var inputs;
    var nodeList;

    this.webpageService.getFormInputs((nodeList) => {
      inputs = [].slice.call(nodeList);
      console.log("page-view:");
      console.log(inputs);
    });
  }
}
