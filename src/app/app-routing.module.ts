import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'prediction', component: PredictionComponent },
  { path: 'results', component: ResultsTableComponent,  canActivate: [AuthGuard] },
  { path: 'documentation', component: DocumentationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
