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

  constructor(private webpageService:WebpageService) { }

  ngOnInit() {
    var vm = this;

    vm.webpageService.getCurrentTabUrl((url) => {
      var savedColor = "grey";

      vm.webpageService.changeBackgroundColor(savedColor);
      vm.webpageService.getFormInputs();
    });
  }
}
