import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../webpage.service';
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

  constructor(private WebpageService: WebpageService) {}

  ngOnInit() {
    this.getCurrentTabUrl();
    this.getFormTextAreas();
  }

  getCurrentTabUrl() {
    this.WebpageService.getCurrentTabUrl().then(
      (url: string) => {
        console.log(url);
        this.url = url;
      },
      (err) => console.log(err)
    );
  }

  getFormTextAreas(){
    this.WebpageService.getFormTextAreas().then(
      (textareas: any[]) => {
        console.log(textareas);
        this.textareas = textareas;
        this.getSavedTemplates();
      },
      (err) => console.log(err)
    );
  }

  saveChange(textarea){
    console.log("save: " + textarea.text);
    this.saveTemplate(textarea.id, textarea.text);
  }

  saveTemplate(id, text){
    console.log("save: " + text);
    this.WebpageService.saveTemplate(id, text);
  }

  getSavedTemplates() {
    this.textareas.forEach((textarea) => {
      this.WebpageService.getSavedTemplate(textarea.id).then(
        (template: string) => {
          textarea.text = template;
          console.log("saved template:" + textarea.text);
        },
        (err) => console.log(err)
      );
    });
  }

  applyTemplate(textarea){
    console.log("apply: " + textarea.text);
    this.WebpageService.setFormTextArea(textarea.id, textarea.text);
  }
}
