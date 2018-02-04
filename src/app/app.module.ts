import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageViewComponent } from './page-view/page-view.component';
import { WebpageService } from './webpage.service';
import { MembraneService } from './membrane.service';

@NgModule({
  declarations: [
    AppComponent,
    PageViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [WebpageService, MembraneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
