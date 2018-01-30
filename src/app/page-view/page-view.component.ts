import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../webpage.service';
import { MembraneService } from '../membrane.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {

  inputs: any[] = [{id: "demo id",name: "demo name",value: "demo value",type: "checkbox"}];
  textareas: any[] = [{id: "demo id",name: "demo name"}];
  templates: any[] = [{id: "demo id", text: "demo text"}];
  url: string = "";
  textValue = 'initial value';

  constructor(private WebpageService: WebpageService,
              private MembraneService: MembraneService) {}

  ngOnInit() {
    this.getCurrentTabUrl();
    //getFormTextAreas();
  }

  getCurrentTabUrl(){
    this.MembraneService.getCurrentTabUrl()
    .subscribe(res => this.url = res);
  }

  getFormTextAreas(){
    this.MembraneService.getFormTextAreas()
    .subscribe(res => this.textareas = res);
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
}

// export class TasksComponent {
//   tasks: Array<Task>;
//   constructor(public taskService: TaskService) {
//     // now it's a simple subscription to the observable
//     taskService.getTasks()
//       .subscribe(res => this.tasks = res);
//   }
// }
