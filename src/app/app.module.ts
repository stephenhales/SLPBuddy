import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageViewComponent } from './page-view/page-view.component';
import { WebpageService } from './webpage.service';


@NgModule({
  declarations: [
    AppComponent,
    PageViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebpageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
