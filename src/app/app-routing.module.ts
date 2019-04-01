import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { ResultComponent } from './components/result/result.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { PredictionComponent } from './components/prediction/prediction.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'prediction', component: PredictionComponent },
  { path: 'result/:id', component: ResultComponent },
  { path: 'result', component: ResultsTableComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
