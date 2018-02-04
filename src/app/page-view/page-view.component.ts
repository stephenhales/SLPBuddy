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

  private textareas: any[] = [{id: "demo id",name: "demo name", savedTemplate:""}];
  private url: string = "";

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
        this.getSavedTemplates();
      },
      (err) => console.log(err)
    );
  }

  saveChange(textarea){
    this.saveTemplate(textarea.id, textarea.savedTemplate);
  }

  saveTemplate(id, text){
    console.log("save this: " + text);
    this.WebpageService.saveTemplate(id, text);
  }

  getSavedTemplates() {
    this.textareas.forEach((textarea) => {
      this.MembraneService.getSavedTemplate(textarea.id).then(
        (template: string) => {
          textarea.savedTemplate = template;
          console.log("saved template:" + textarea.savedTemplate);
        },
        (err) => console.log(err)
      );
    });
  }
}
