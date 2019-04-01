import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { ResultComponent } from './components/result/result.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PredictionComponent,
    ResultsTableComponent,
    ResultComponent,
    DocumentationComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
