import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../webpage.service';
import { MembraneService } from '../membrane.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {

  private inputs: any[] = [{id: "demo id",name: "demo name",value: "demo value",type: "checkbox"}];
  private textareas: any[] = [{id: "demo id",name: "demo name"}];
  private templates: any[] = [{id: "demo id", text: "demo text"}];
  private url: string = "";
  private textValue = 'initial value';

  private urlSubscription: Subscription;

  constructor(private WebpageService: WebpageService,
              private MembraneService: MembraneService) {}

  ngOnInit() {
    this.getCurrentTabUrl();
    this.getFormTextAreas();
  }

  getCurrentTabUrl() {
    this.MembraneService.getCurrentTabUrl().then(
      (url: string) => {
        console.log(url);
        this.url = url;
      },
      (err) => console.log(err)
    );
  }

  getFormTextAreas(){
    this.MembraneService.getFormTextAreas().then(
      (textareas: any[]) => {
        console.log(textareas);
        this.textareas = textareas;
      },
      (err) => console.log(err)
    );
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
  ngOnDestroy() {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
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
